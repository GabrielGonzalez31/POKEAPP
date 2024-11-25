import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/bd.models';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { UtilsService } from 'src/app/servicios/utils.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
    nombre: new FormControl('',[Validators.required, Validators.minLength(4)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    clave: new FormControl('',[Validators.required]),
    tipo: new FormControl('',[Validators.required]),
  })

  firebaseAuth = inject(FirebaseService);
  utils = inject(UtilsService);
  ngOnInit() {
  }

  async submit(){
    if ( this.form.valid) {

      const isLoading = await this.utils.cargando();
      await isLoading.present();

      this.firebaseAuth.registrar(this.form.value as Usuario).then(async res => {

        await this.firebaseAuth.actualizarUsuario(this.form.value.nombre);
        // registrar.page.ts
        //this.utils.guardadoLocal('user', this.form.value);  // Guarda el usuario en localStorage
        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);

        this.setUserInfo(uid);

      }).catch(error => {
        console.log(error);
        this.utils.presentToast({
          message: 'Correo o Contraseña incorrectas. Vuelva a intentarlo',
          duration: 2000,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline',
        });

      }).finally(() => {
        isLoading.dismiss();
      })
    }
  }

  async setUserInfo(uid: string){
    if ( this.form.valid) {

      const isLoading = await this.utils.cargando();
      await isLoading.present();

      let path = `users/${uid}`;
      delete this.form.value.clave;

      this.firebaseAuth.setDocument(path, this.form.value).then(async res => {

        this.utils.guardadoLocal('user', this.form.value);
        this.utils.routerLink('/home');
        console.log('Tipo de usuario:', this.form.value.tipo);
        this.utils.setTipoUsuario(this.form.value.tipo);
        this.form.reset();

      }).catch(error => {
        console.log(error);
        this.utils.presentToast({
          message: 'Correo o Contraseña incorrectas. Vuelva a intentarlo',
          duration: 2000,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline',
        });

      }).finally(() => {
        isLoading.dismiss();
      })
    }
  }

}
