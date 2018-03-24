import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MinesweeperComponent } from './minesweeper/minesweeper.component';
import { NewGameComponent } from './new-game/new-game.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatButtonModule, MatSliderModule, MatInputModule,
  MatFormFieldModule, MatDividerModule
} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    MinesweeperComponent,
    NewGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule
  ],
  entryComponents: [
    NewGameComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
