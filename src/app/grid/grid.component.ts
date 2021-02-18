import { Component, OnInit } from '@angular/core';

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
    this.rows = [...Array(6).keys()];
    this.cols = [...Array(7).keys()];
  }
}
