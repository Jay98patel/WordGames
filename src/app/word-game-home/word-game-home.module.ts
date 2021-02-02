import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WordGameHomeRoutingModule } from './word-game-home-routing.module';
import { WordGameComponent } from './word-game/word-game.component';
import {  ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [WordGameComponent],
  imports: [
    CommonModule,
    WordGameHomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class WordGameHomeModule { }
