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
  public genderRates: { gender: 'female' | 'male'; rate: number; }[];
  private genders: { gender: 'female' | 'male'; rate: number; name: string; }[];

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
    this.genders = [];
    this.genderRates = [];
    this.activeRoute.paramMap.subscribe((param: ParamMap) => {
      this.pokemonId = Number(param.get('pokemonId'));
    });
  }

  ngOnInit(): void {
    this.getGenders();
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
    setTimeout(() => {
      this.getGender(this.pokemon.name);
    }, 1000);
  }

  private getGenders(): void {
    // TODO: This segment code can improve, moving it to core service, stared at APP_INITIALIZE or act like a global store
    forkJoin([
      this.api.getGenders('male'),
      this.api.getGenders('female')
    ]).subscribe((responses) => {
      if (responses[0]) {
        responses[0].pokemon_species_details.forEach((detail: { pokemon_species: { name: string; }, rate: number }) => {
          this.genders.push({ gender: 'male', name: detail.pokemon_species.name, rate: detail.rate });
        });
      }
      if (responses[1]) {
        responses[1].pokemon_species_details.forEach((detail: { pokemon_species: { name: string; }, rate: number }) => {
          this.genders.push({ gender: 'female', name: detail.pokemon_species.name, rate: detail.rate });
        });
      }
    });
  }

  private getGender(pokemonName: string): void {
    this.genders.forEach((gender) => {
      if (pokemonName === gender.name) {
        this.genderRates.push({ gender: gender.gender, rate: gender.rate });
      }
    });
  }

}
