import {Component, OnInit} from '@angular/core';
import {Tile} from './tile';
import {NewGameComponent} from '../new-game/new-game.component';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss']
})

export class MinesweeperComponent implements OnInit {
  dialog: MatDialog;

  height: number;
  width: number;
  bombs: number;
  tiles: Tile[][];

  constructor(dialog: MatDialog) {
    this.dialog = dialog;
    this.height = 15;
    this.width = 25;
    this.bombs = 10;
    this.tiles = [];
    this.initialize();
  }

  newGame = () => {
    const newGameDialog = this.dialog.open(NewGameComponent, {
      height: '330px',
      width: '350px'
    });

    newGameDialog.componentInstance.data = {
      width: this.width,
      height: this.height,
      bombs: this.bombs
    };

    newGameDialog.componentInstance.new = data => {
      this.width = data.width;
      this.height = data.height;
      this.bombs = data.bombs;
      this.initialize();
    };
  }

  initialize = () => {
    this.tiles = [];
    for (let i = 0; i < this.width; i++) {
      this.tiles[i] = [];
      for (let j = 0; j < this.height; j++) {
        this.tiles[i][j] = new Tile(i, j);
      }
    }
    this.tiles = this.placeBombs(this.tiles, this.bombs);
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
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

  closedTiles = tiles => {
    let closedTiles = 0;
    tiles.map(column => {
      column.map(tile => {
        if (!tile.opened) {
          closedTiles++;
        }
      });
    });
    return closedTiles;
  }

  won = () => {
    return this.closedTiles(this.tiles) <= this.bombs;
  }

  open = (x: number, y: number) => {
    if (x >= 0 && x < this.tiles.length && y >= 0 && y < this.tiles[x].length && !this.tiles[x][y].opened) {
      this.tiles[x][y].opened = true;
      if (this.tiles[x][y].bomb) {
        this.lose();
      } else {
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

        if (this.won()) {
          alert('You have won!');
        }
      }
    }
  }

  lose = () => {
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[i].length; j++) {
        this.tiles[i][j].opened = true;
      }
    }
  }

  reset = () => {
    this.initialize();
  }

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
