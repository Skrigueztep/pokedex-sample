import {PokemonType} from './pokemon-type';

export class Pokemon {

  id: number;
  name: string;
  types: PokemonType[];

  constructor(pokemon?: Pokemon) {
    this.id = (pokemon && pokemon.id) ? pokemon.id : null;
    this.name = (pokemon && pokemon.name) ? pokemon.name : '';
    this.types = (pokemon && pokemon.types) ? pokemon.types : [];
  }

}
