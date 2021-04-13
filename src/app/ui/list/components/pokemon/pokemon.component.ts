import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../../core/services/api/api.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit, AfterViewInit {

  @Input() id: number;
  public pokemon: Pokemon;

  constructor(
    private api: ApiService
  ) {
    this.pokemon = new Pokemon();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.api.getPokemon(this.id).subscribe((pokemon: any) => {
      if (pokemon) {
        this.pokemon = new Pokemon(pokemon);
      }
    });
  }

}

class Pokemon {

  id: number;
  name: string;
  types: PokemonType[];

  constructor(pokemon?: Pokemon) {
    this.id = (pokemon && pokemon.id) ? pokemon.id : null;
    this.name = (pokemon && pokemon.name) ? pokemon.name : '';
    this.types = (pokemon && pokemon.types) ? pokemon.types : [];
  }

}

class PokemonType {

  slot: number;
  type: { name: string; };

  constructor(type?: PokemonType) {
    this.slot = (type && type.slot) ? type.slot : null;
    this.type = (type && type.type) ? type.type : { name: '' };
  }

}
