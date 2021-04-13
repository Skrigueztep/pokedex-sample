import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list/list.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import {MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    ListComponent,
    PokemonComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    MatRippleModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class ListModule { }
