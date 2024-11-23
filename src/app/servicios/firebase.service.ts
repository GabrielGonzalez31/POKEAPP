import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail} from 'firebase/auth';
import { Usuario } from '../models/bd.models';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsService = inject(UtilsService);

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
