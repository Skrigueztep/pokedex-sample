import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../../core/services/api/api.service';
import {Pokemon} from '../../../../models/pokemon';

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
