export class Tile {
  x: number;
  y: number;
  bomb: boolean;
  opened: boolean;
  neighbours: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.bomb = false;
    this.opened = false;
    this.neighbours = 0;
  }
}
