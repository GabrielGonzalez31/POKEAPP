import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/bd.models';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { UtilsService } from 'src/app/servicios/utils.service';

@Component({
  selector: 'app-restablecer-clave',
  templateUrl: './restablecer-clave.page.html',
  styleUrls: ['./restablecer-clave.page.scss'],
})
export class RestablecerClavePage implements OnInit {

  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
  })

  firebaseAuth = inject(FirebaseService);
  utils = inject(UtilsService);
  ngOnInit() {
  }

  async submit(){
    if ( this.form.valid) {

      const isLoading = await this.utils.cargando();
      await isLoading.present();

      this.firebaseAuth.recuperarClave(this.form.value.email).then(res => {

        this.utils.presentToast({
          message: 'Correo enviado con éxito',
          duration: 2000,
          color: 'medium',
          position: 'middle',
          icon: 'mail-outline',
        });

        this.utils.routerLink('/auth');
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


