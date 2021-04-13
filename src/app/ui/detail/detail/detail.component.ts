import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ApiService} from '../../../core/services/api/api.service';
import {Pokemon} from '../../../models/pokemon';
import {PokemonAbility} from '../../../models/pokemon-ability';
import {PokemonMove} from '../../../models/pokemon-move';
import {forkJoin} from 'rxjs';
import {PokemonSpecie} from '../../../models/pokemon-specie';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, AfterViewInit {

  public pokemon: Pokemon;
  public mainClass: string;
  public pokemonId: number;
  public abilities: string[];
  public species: string[];
  public moves: string[];
  public evolutions: PokemonSpecie[];

  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly api: ApiService
  ) {
    this.pokemonId = null;
    this.pokemon = new Pokemon();
    this.mainClass = '';
    this.abilities = [];
    this.moves = [];
    this.evolutions = [];
    this.activeRoute.paramMap.subscribe((param: ParamMap) => {
      this.pokemonId = Number(param.get('pokemonId'));
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // TODO: This segment code can improve, changing request to resolver before load component
    forkJoin([
      this.api.getPokemon(this.pokemonId),
      this.api.getPokemonEvolution(this.pokemonId)
    ]).subscribe((responses) => {
      if (responses[0]) {
        this.pokemon = new Pokemon(responses[0]);
        this.pokemon.abilities.forEach((ability: PokemonAbility) => {
          this.abilities.push(ability.ability.name);
        });
        this.pokemon.moves.forEach((move: PokemonMove) => {
          this.moves.push(move.move.name);
        });
        this.mainClass = (this.pokemon.types.length > 0) ? `type-${this.pokemon.types[0].type.name}` : '' ;
      }
      if (responses[1]) {
        responses[1].chain.evolves_to.forEach((evolution) => {
          this.evolutions.push(new PokemonSpecie(evolution.species));
          evolution.evolves_to.forEach((pokemon) => {
            this.evolutions.push(new PokemonSpecie(pokemon.species));
          });
        });
      }
    });
  }

}
