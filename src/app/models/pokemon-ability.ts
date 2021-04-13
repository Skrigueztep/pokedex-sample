export class PokemonAbility {

  ability: { name: string; };

  constructor(ability?: PokemonAbility) {
    this.ability = (ability && ability.ability) ? ability.ability : { name: '' };
  }

}
