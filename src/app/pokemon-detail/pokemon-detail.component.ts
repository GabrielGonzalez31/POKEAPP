import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilsService } from 'src/app/servicios/utils.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent {
  @Input() pokemonData: any;  // Recibe los datos del Pokémon

  constructor(private modalController: ModalController, private utilsService: UtilsService) {}


  isEntrenador: boolean;
  isEspectador: boolean;

  async ngOnInit() {
    this.getPokemon();
     // Obtener el tipo de usuario al suscribirse al BehaviorSubject
     this.utilsService.getTipoUsuario().subscribe((tipo) => {
      this.isEntrenador = tipo === 'entrenador';
      this.isEspectador = tipo === 'espectador';
      console.log('Es entrenador:', this.isEntrenador);
      console.log('Es espectador:', this.isEspectador);
    });
  }


  async getPokemon() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1100');
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
      return ({
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


  closePopup() {
    this.modalController.dismiss();
  }


}
