import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../core/services/api/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public pokemons: { name: string; url: string; id: number; }[];
  private readonly pokemonsList: { name: string; url: string; id: number; }[];
  private offset: number;

  constructor(
    private readonly api: ApiService
  ) {
    this.offset = 0;
    this.pokemons = [];
    this.pokemonsList = [];
    this.getPokemons();
  }

  ngOnInit(): void {
  }

  onSearchPokemon(ev: any): void {
    if (ev.target.value.toString().length === 0) {
      this.pokemons = this.pokemonsList;
    } else {
      const query = ev.target.value;
      if (isNaN(query) === false) {
        this.pokemons = this.pokemonsList.filter((pokemon) => pokemon.id.toString().includes(query.toString().toLowerCase()));
      } else {
        this.pokemons = this.pokemonsList.filter((pokemon) => pokemon.name.toLowerCase().includes(query.toLowerCase()));
      }
    }
  }

  onLoadMore(): void {
    this.offset = this.offset + 1;
    this.getPokemons();
  }

  private getPokemons(): void {
    this.api.getPokemons(this.offset).subscribe((response) => {
      if (response) {
        if (response.results.length > 0) {
          response.results.forEach((pokemon) => {
            this.pokemonsList.push({
              name: pokemon.name,
              url: pokemon.url,
              id: Number(pokemon.url.split('/')[pokemon.url.split('/').length - 2])
            });
          });
        }
        this.pokemons = this.pokemonsList;
      }
    });
  }

}
