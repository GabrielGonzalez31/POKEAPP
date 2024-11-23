import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestablecerClavePage } from './restablecer-clave.page';

const routes: Routes = [
  {
    path: '',
    component: RestablecerClavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestablecerClavePageRoutingModule {}
