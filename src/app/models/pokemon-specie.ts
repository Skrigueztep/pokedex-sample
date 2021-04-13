export class PokemonSpecie {

  name: string;
  url: string;

  constructor(specie: PokemonSpecie) {
    this.name = (specie && specie.name) ? specie.name : '';
    this.url = (specie && specie.url) ? specie.url : '';
  }

}
