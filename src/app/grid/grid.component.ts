import { Component, Input, OnInit } from '@angular/core';
import { GRID_COLS, GRID_ROWS } from './config';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Input() isVeiled: boolean;

  rows = [];
  cols = [];
  hoveredCol?: number;

  constructor() {}

  ngOnInit(): void {
    this.rows = [...Array(GRID_ROWS).keys()].reverse();
    this.cols = [...Array(GRID_COLS).keys()];
  }

  /**
   * Set `hoveredCol` to given `col`.
   */
  setHoverCol(col: number): void {
    this.hoveredCol = col;
  }

  /**
   * Clears the value of `hoveredCol`.
   */
  clearHoverCol(): void {
    this.hoveredCol = undefined;
  }
}
