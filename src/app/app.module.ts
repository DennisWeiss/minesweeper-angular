import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MinesweeperComponent } from './minesweeper/minesweeper.component';
import { NewGameComponent } from './new-game/new-game.component';


@NgModule({
  declarations: [
    AppComponent,
    MinesweeperComponent,
    NewGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
