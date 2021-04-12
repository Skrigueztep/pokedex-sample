import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list/list.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';


@NgModule({
  declarations: [
    ListComponent,
    PokemonComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule
  ]
})
export class ListModule { }
