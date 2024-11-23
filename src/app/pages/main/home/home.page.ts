import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { UtilsService } from 'src/app/servicios/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebase = inject(FirebaseService);
  utilsService = inject(UtilsService);

  ngOnInit() {
  }

  cerrarSesion() {
    this.firebase.cerrarSesion();
  }


}
