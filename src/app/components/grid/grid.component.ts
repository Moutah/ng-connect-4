import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  rows = [...Array(6).keys()];
  cols = [...Array(7).keys()];

  constructor() {}

  ngOnInit(): void {}
}
