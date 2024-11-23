import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  isLoading = inject(LoadingController);
  toastControl = inject(ToastController);
  router = inject(Router);

  cargando (){
    return this.isLoading.create({spinner: 'crescent'});
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastControl.create(opts);
    toast.present();
  }

  // Enruta a cualquier pagina disponible
  routerLink(url: string){
    return this.router.navigateByUrl(url);
  }

  // Guarda un elemento en locaStorage
  guardadoLocal(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value));
  }

  //Obtiene un elemento desde locastorage
  obtenerDeLocaStorage(key:string){
    return JSON.parse(localStorage.getItem(key))
  }
}
