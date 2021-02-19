import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GameService } from 'src/app/game/game.service';
import { GridCoord } from 'src/app/shared/grid-coords';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent implements OnInit {
  @Input() row: number;
  @Input() col: number;

  cellContent$: Observable<string>;
  isHighlighted$: Observable<boolean>;

  constructor(private store: Store, private game: GameService) {
    // select this cell in grid store
    this.cellContent$ = this.store.select(
      (state) => state.grid.cols[this.col][this.row] || ''
    );

    this.isHighlighted$ = this.store.select((state) => {
      return state.grid.highlights.some(
        (highlight: GridCoord) =>
          highlight.col === this.col && highlight.row === this.row
      );
    });
  }

  ngOnInit(): void {}

  /**
   * Play a coin in this cell's column
   */
  playCoin(): void {
    this.game.play(this.col);
  }
}
