import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PokemonDetailComponent } from './pokemon-detail.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [PokemonDetailComponent],
  exports: [PokemonDetailComponent]  // Esto permite usarlo en otros módulos
})
export class PokemonDetailModule {}
