import {PokemonType} from './pokemon-type';
import {PokemonAbility} from './pokemon-ability';
import {PokemonStats} from './pokemon-stats';
import {PokemonMove} from './pokemon-move';

export class Pokemon {

  id: number;
  name: string;
  types: PokemonType[];
  species: { name: string; url: string };
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  stats: PokemonStats[];
  moves: PokemonMove[];

  constructor(pokemon?: Pokemon) {
    this.id = (pokemon && pokemon.id) ? pokemon.id : null;
    this.name = (pokemon && pokemon.name) ? pokemon.name : '';
    this.types = (pokemon && pokemon.types) ? pokemon.types : [];
    this.species = (pokemon && pokemon.species) ? pokemon.species : { name: '', url: '' };
    this.height = (pokemon && pokemon.height) ? pokemon && pokemon.height : null;
    this.weight = (pokemon && pokemon.weight) ? pokemon && pokemon.weight : null;
    this.abilities = (pokemon && pokemon.abilities) ? pokemon.abilities : [];
    this.stats = (pokemon && pokemon.stats) ? pokemon.stats : [];
    this.moves = (pokemon && pokemon.moves) ? pokemon.moves : [];
  }

}
