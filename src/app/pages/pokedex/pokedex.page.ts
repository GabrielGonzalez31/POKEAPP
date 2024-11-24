import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';  // Importa ModalController
import { PokemonDetailComponent } from '../../pokemon-detail/pokemon-detail.component'; // Ajusta la ruta

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {
  constructor(private navCtrl: NavController, private modalController: ModalController) {}

  ngOnInit() {
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


      const typeTranslations: { [key: string]: string } = {
        normal: 'Normal',
        fire: 'Fuego',
        water: 'Agua',
        electric: 'Eléctrico',
        grass: 'Planta',
        ice: 'Hielo',
        fighting: 'Lucha',
        poison: 'Veneno',
        ground: 'Tierra',
        flying: 'Volador',
        psychic: 'Psíquico',
        bug: 'Bicho',
        rock: 'Roca',
        ghost: 'Fantasma',
        dragon: 'Dragón',
        dark: 'Siniestro',
        steel: 'Acero',
        fairy: 'Hada'
      };


      // Procesar tipos
      const typeSlot1 = typeTranslations[data.types.find((typeInfo: any) => typeInfo.slot === 1)?.type.name || 'unknown'];
      ;

      // Procesar habilidades
      const abilities = data.abilities.map((abilityInfo: any) => abilityInfo.ability.name).join(', ');

      // Obtener vida (HP)
      const hp = data.stats.find((stat: any) => stat.stat.name === "hp")?.base_stat;





      // Retornar el objeto con los detalles
      return this.buildPokemonCard({
        name: data.name,
        image: data.sprites.front_default,
        id: data.id,
        types: typeSlot1, // Agregar tipos
        abilities: data.abilities, // Agregar habilidades
        hp

      });
    } catch (err) {
      console.error(`Error al obtener detalles de ${pokemon.name}:`, err);
      return null;
    }
  }

  buildPokemonCard(pokemon: { name: string; image: string; id: number, types: string, abilities: string, hp: number }): HTMLElement {
    const col = document.createElement('div');
    const card = document.createElement('div');
    const cardBody = document.createElement('div');
    const cardTitle = document.createElement('h5');
    const image = document.createElement('img');
    const btn = document.createElement('button');

    cardTitle.className = 'card-title';
    cardTitle.innerHTML = pokemon.name;
    cardTitle.style.fontFamily = 'Impact, Haettenschweiler, sans-serif';

    cardBody.className = 'card-body';
    cardBody.appendChild(cardTitle);

    // Añadir el botón de inspeccionar
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Inspeccionar';
    btn.addEventListener('click', () => {
      this.showPokemonDetail(pokemon);
    });

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

  showPokemonDetail(pokemon: { name: string; image: string; id: number, types: string, abilities: string, hp: number}) {
    this.modalController.create({
      component: PokemonDetailComponent,
      componentProps: {
        pokemonData: pokemon,  // Pasa los datos del Pokémon aquí
      },
    }).then((modalElement) => modalElement.present());
  }
}
