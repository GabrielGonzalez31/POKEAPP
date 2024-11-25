import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { UtilsService } from 'src/app/servicios/utils.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  user: any;  // Variable para almacenar los datos del usuario
  utils = inject(UtilsService)
  constructor() {}

  ngOnInit() {
    // Obtener los datos del usuario desde localStorage
    this.user = this.utils.obtenerDeLocaStorage('user');
  }

}
