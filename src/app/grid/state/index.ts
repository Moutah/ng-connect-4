import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { GridCoord } from 'src/app/shared/grid-coords';
import { environment } from 'src/environments/environment';
import { Reset, PlayCoin, HighlightCells } from './actions';

export interface GridStateModel {
  cols: string[][];
  highlights: GridCoord[];
}

@State<GridStateModel>({
  name: 'grid',
  defaults: {
    cols: [],
    highlights: [],
  },
})
@Injectable()
export class GridState {
  /**
   * Returns `true` if all cells are filled.
   */
  @Selector()
  static isFull(state: GridStateModel): boolean {
    return state.cols.every((col) => col.length === environment.gridRows);
  }

  /**
   * Marks the game as _not_ over.
   */
  @Action(Reset)
  resetGrid(ctx: StateContext<GridStateModel>): void {
    // generate empty cols
    const cols = [...Array(environment.gridCols).keys()].map(() => []);
    ctx.patchState({ cols, highlights: [] });
  }

  /**
   * Marks the game as _not_ over.
   */
  @Action(PlayCoin)
  playCoin(ctx: StateContext<GridStateModel>, action: PlayCoin): void {
    // copy cols state
    const state = ctx.getState();
    const cols = [...state.cols];

    // add the coin to targeted column
    cols[action.col].push(action.player.id);

    // update state
    ctx.patchState({ cols });
  }

  /**
   * Marks the game as _not_ over.
   */
  @Action(HighlightCells)
  highlightCells(
    ctx: StateContext<GridStateModel>,
    action: HighlightCells
  ): void {
    ctx.patchState({ highlights: action.cells });
  }
}
