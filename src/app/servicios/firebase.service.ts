import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail} from 'firebase/auth';
import { Usuario } from '../models/bd.models';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsService = inject(UtilsService);
  private usuarioSubject = new BehaviorSubject<Usuario | null>(null); // Comienza con un valor null
  public usuario$ = this.usuarioSubject.asObservable();  // Observable que puedes suscribir en cualquier componente

  constructor() {
    // Suscribirse a cambios de usuario de Firebase
    this.auth.authState.subscribe(user => {
      if (user) {
        // Si el usuario está logueado, actualizamos el BehaviorSubject con su info
        this.getUserData(user.uid).then((data) => {
          this.usuarioSubject.next(data);
        });
      } else {
        // Si no hay usuario, seteamos null
        this.usuarioSubject.next(null);
      }
    });
  }

  private async getUserData(uid: string): Promise<Usuario> {
    const docRef = doc(getFirestore(), 'usuarios', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Usuario;  // Devuelve los datos del usuario
    } else {
      throw ('');
    }
  }
  getAuth(){
    return getAuth();
  }

  iniciarSesion(usuario: Usuario){
    return signInWithEmailAndPassword(getAuth(), usuario.email, usuario.clave);
  }

  cerrarSesion(){
    getAuth().signOut();
    localStorage.removeItem('usuario');
    this.utilsService.routerLink('/auth');
  }

  registrar(usuario: Usuario){
    return createUserWithEmailAndPassword(getAuth(), usuario.email, usuario.clave);
  }

  actualizarUsuario(displayName: string){
    return updateProfile(getAuth().currentUser, { displayName });
  }

  recuperarClave(email: string){
    return sendPasswordResetEmail(getAuth(),email);
  }


  setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(), path), data);
  }

  async getDocument(path: string){
    return (await getDoc(doc(getFirestore(), path))).data(); //Para obtener la data directamente
  }

}
