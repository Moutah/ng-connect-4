import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

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
    this.rows = [...Array(environment.gridRows).keys()].reverse();
    this.cols = [...Array(environment.gridCols).keys()];
  }
}
