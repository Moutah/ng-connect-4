import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { GridCoord } from '../grid-coords';
import { GRID_COLS, GRID_ROWS } from '../config';
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
   * Returns the grid columns.
   */
  @Selector()
  static gridCols(state: GridStateModel): string[][] {
    return state.cols;
  }

  /**
   * Returns `true` if all cells are filled.
   */
  @Selector()
  static isFull(state: GridStateModel): boolean {
    return state.cols.every((col) => col.length === GRID_ROWS);
  }

  /**
   * Marks the game as _not_ over.
   */
  @Action(Reset)
  resetGrid(ctx: StateContext<GridStateModel>): void {
    // generate empty cols
    const cols = [...Array(GRID_COLS).keys()].map(() => []);
    ctx.patchState({ cols, highlights: [] });
  }

  /**
   * Plays a coin in a specified column for specified player.
   */
  @Action(PlayCoin)
  playCoin(ctx: StateContext<GridStateModel>, action: PlayCoin): void {
    // copy cols state
    const state = ctx.getState();
    const cols = [...state.cols];

    // add the coin to targeted column
    cols[action.col].push(action.ownerId);

    // update state
    ctx.patchState({ cols });
  }

  /**
   * Set cells to be highlighted.
   */
  @Action(HighlightCells)
  highlightCells(
    ctx: StateContext<GridStateModel>,
    action: HighlightCells
  ): void {
    ctx.patchState({ highlights: action.cells });
  }
}
