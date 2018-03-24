import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {
  data = {
    width: 20,
    height: 15,
    bombs: 15
  }
  new: any;

  constructor(public dialogRef: MatDialog) {}

  ok = () => {
    this.new(this.data);
    this.close();
  }

  change = (key, value) => {
    console.log(key, value);
    this.data[key] = value;
    this.data.bombs = Math.min(this.data.bombs, this.data.height * this.data.width - 1);
    console.log(this.data);
  }

  close = () => this.dialogRef.closeAll();

  ngOnInit() {
  }

}
