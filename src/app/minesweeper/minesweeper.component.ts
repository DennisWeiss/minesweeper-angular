import { Component, OnInit } from '@angular/core';
import {Tile} from './tile';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss']
})

export class MinesweeperComponent implements OnInit {
  width: number;
  height: number;
  bombs: number;
  tiles: Tile[][];

  constructor() {
    this.width = 20;
    this.height = 15;
    this.bombs = 10;
    this.tiles = [];
    this.initialize();
  }

  initialize = () => {
    for (let i = 0; i < this.height; i++) {
      this.tiles[i] = [];
      for (let j = 0; j < this.width; j++) {
        this.tiles[i][j] = new Tile(i, j);
      }
    }
    this.tiles = this.placeBombs(this.tiles, this.bombs);
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.tiles[i][j].neighbours = this.neighbors(this.tiles, i, j);
      }
    }
  }

  placeBombs = (tiles: Tile[][], bombs: number) => {
    const tilesWthBombs = tiles.slice();
    while (bombs > 0) {
      const x = Math.floor(tilesWthBombs.length * Math.random());
      const y = Math.floor(tilesWthBombs[0].length * Math.random());
      if (!tilesWthBombs[x][y].bomb) {
        tilesWthBombs[x][y].bomb = true;
        bombs--;
      }
    }
    return tilesWthBombs;
  }

  open = (x: number, y: number) => {
    if (x >= 0 && x < this.tiles.length && y >= 0 && y < this.tiles[x].length && !this.tiles[x][y].opened) {
      this.tiles[x][y].opened = true;
      if (this.tiles[x][y].bomb) {
        for (let i = 0; i < this.tiles.length; i++) {
          for (let j = 0; j < this.tiles[i].length; j++) {
            this.tiles[i][j].opened = true;
          }
        }
      }
      if (this.tiles[x][y].neighbours === 0) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (!(i === 0 && j === 0)) {
              console.log(i, j);
              this.open(x + i, y + j);
            }
          }
        }
      }
    }
  }

  reset = () => this.initialize();

  neighbors = (tiles: Tile[][], x: number, y: number) => {
    let neighbours = 0;
    console.log('tiles', tiles, x, y);
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (!(i === 0 && j === 0)) {
          if (x + i >= 0 && x + i < tiles.length && y + j >= 0 && y + j < tiles[x + i].length) {
            if (tiles[x + i][y + j].bomb) {
              neighbours++;
            }
          }
        }
      }
    }
    return neighbours;
  }

  ngOnInit() {
  }

}
