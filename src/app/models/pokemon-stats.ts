export class PokemonStats {

  base_stat: number;
  effort: number;
  stat: { name: string; };

  constructor(stats: PokemonStats) {
    this.base_stat = (stats && stats.base_stat) ? stats.base_stat : null;
    this.effort = (stats && stats.effort) ? stats.effort : null;
    this.stat = (stats && stats.stat) ? stats.stat : { name: '' };
  }

}
