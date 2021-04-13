export class PokemonType {

  slot: number;
  type: { name: string; };

  constructor(type?: PokemonType) {
    this.slot = (type && type.slot) ? type.slot : null;
    this.type = (type && type.type) ? type.type : { name: '' };
  }

}
