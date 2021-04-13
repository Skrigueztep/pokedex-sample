export class PokemonMove {

  move: { name: string };

  constructor(move: PokemonMove) {
    this.move = (move && move.move) ? move.move : { name: '' };
  }

}
