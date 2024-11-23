import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {

  constructor(private navCtrl: NavController) {}


  goBack() {
    this.navCtrl.navigateBack('/inicio');
  }


  async ngOnInit() {
    this.getPokemon();
  }

  async getPokemon() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();

      // Cargar detalles de todos los Pokémon
      const pokemonCards = await Promise.all(
        data.results.map((pokemon: any) => this.getPokemonDetails(pokemon))
      );

      const wrapper = document.getElementById('wraper');
      if (wrapper) {
        pokemonCards.forEach((card) => {
          if (card) wrapper.appendChild(card);
        });
      }
    } catch (err) {
      console.error('Error al obtener los Pokémon:', err);
    }
  }

  async getPokemonDetails(pokemon: any) {
    try {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      return this.buildPokemonCard({
        name: data.name,
        image: data.sprites.front_default,
      });
    } catch (err) {
      console.error(`Error al obtener detalles de ${pokemon.name}:`, err);
      return null; // Para evitar que falle Promise.all
    }
  }

  buildPokemonCard(pokemon: { name: string; image: string }): HTMLElement {
    // Crear estructura de la tarjeta
    const col = document.createElement('div');
    const card = document.createElement('div');
    const cardBody = document.createElement('div');
    const cardTitle = document.createElement('h5');
    const image = document.createElement('img');
    const btn = document.createElement('a');

    cardTitle.className = 'card-title';
    cardTitle.innerHTML = pokemon.name;

    cardBody.className = 'card-body';
    cardBody.appendChild(cardTitle);



    cardBody.appendChild(btn);

    image.src = pokemon.image;
    image.className = 'card-img-top';
    image.alt = pokemon.name;

    card.className = 'card';
    card.style.width = '10rem';
    card.appendChild(image);
    card.appendChild(cardBody);

    col.className = 'col';
    col.appendChild(card);

    return col;
  }

}
