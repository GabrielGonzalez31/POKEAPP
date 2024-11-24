import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent {
  @Input() pokemonData: any;  // Recibe los datos del Pokémon

  constructor(private modalController: ModalController) {}


  closePopup() {
    this.modalController.dismiss();
  }

  ngOnInit() {
    console.log(this.pokemonData);  // Verifica que los datos estén llegando
  }
}
