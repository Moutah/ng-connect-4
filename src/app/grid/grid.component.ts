import { Component, OnInit } from '@angular/core';
import { GRID_COLS, GRID_ROWS } from './config';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  rows = [];
  cols = [];

  constructor() {}

  ngOnInit(): void {
    this.rows = [...Array(GRID_ROWS).keys()].reverse();
    this.cols = [...Array(GRID_COLS).keys()];
  }
}
