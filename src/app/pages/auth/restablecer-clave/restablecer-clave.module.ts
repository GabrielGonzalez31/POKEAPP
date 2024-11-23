import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestablecerClavePageRoutingModule } from './restablecer-clave-routing.module';

import { RestablecerClavePage } from './restablecer-clave.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestablecerClavePageRoutingModule,
    SharedModule
  ],
  declarations: [RestablecerClavePage]
})
export class RestablecerClavePageModule {}
