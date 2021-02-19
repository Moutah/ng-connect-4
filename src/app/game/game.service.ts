import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import * as Grid from '../grid/state/actions';
import * as Game from './state/actions';
import { GameState } from './state';
import { Player } from '../shared/player';
import { GridState } from '../grid/state';
import { GridCoord } from '../shared/grid-coords';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private store: Store) {}

  /**
   * Initilaize the game's players.
   */
  setup(player1: Player, player2: Player): void {
    const firstPlayer = Math.random() > 0.5 ? player1 : player2;
    this.store.dispatch(new Game.SetPlayers(player1, player2));
    this.store.dispatch(new Game.SetFirstPlayer(firstPlayer));
  }

  /**
   * Starts the game :)
   */
  start(): void {
    // reset the grid and starts the game
    this.store.dispatch(new Grid.Reset());
    this.store.dispatch(new Game.Start());
  }

  /**
   * Clears the game.
   */
  clear(): void {
    this.store.dispatch(new Game.Clear());
  }

  /**
   * Play a coin for active player in given `col` and
   */
  play(col: number): void {
    // make sure the game has started
    if (!this.store.selectSnapshot(GameState.isStarted)) {
      throw new Error(
        '[Game Service] The game has not started, play() is not allowed.'
      );
    }

    // make sure targeted colum is not full
    const gridCols: string[][] = this.store.selectSnapshot(
      (state) => state.grid.cols
    );
    if (gridCols[col].length >= environment.gridRows) {
      return;
    }

    // play coin for active player
    const activePlayer = this.store.selectSnapshot(GameState.activePlayer);
    this.store.dispatch(new Grid.PlayCoin(activePlayer, col));

    // get play values
    const row = gridCols[col].length - 1;
    const value = gridCols[col][row];

    // get connected cells
    const cells = this.getConnectedCells({ col, row }, value);

    // check if game is won
    if (cells) {
      this.store.dispatch(new Grid.HighlightCells(cells));
      this.store.dispatch(new Game.Won(activePlayer));
      return;
    }

    // check if game is over
    if (this.store.selectSnapshot(GridState.isFull)) {
      this.store.dispatch(new Game.End());
      return;
    }

    // start next player's turn
    this.store.dispatch(new Game.NextPlayer());
  }

  /**
   * Look in 4 directions (horizontal, vertical, backward diagonal and
   * forward diagonal) around given `pivot` for cells that have the same value
   * as given `value`. Returns the cells coordinates if 4 connected ones are
   * found, `null` otherwise.
   */
  private getConnectedCells(
    pivot: GridCoord,
    value: string
  ): GridCoord[] | null {
    const gridCols: string[][] = this.store.selectSnapshot(
      (state) => state.grid.cols
    );

    // define utils
    const coefs = [-3, -2, -1, 0, 1, 2, 3];
    const bases = [
      // vertical
      { h: 0, v: 1 },

      // horizontal
      { h: 1, v: 0 },

      // backwardDiag
      { h: 1, v: -1 },

      // forwardDiag
      { h: 1, v: 1 },
    ];

    // check every base
    let winningCells: GridCoord[];
    let col: number;
    let row: number;
    let cellValue: string;
    for (const base of bases) {
      // try to extract 4 consecutive cells
      winningCells = [];
      for (const coef of coefs) {
        col = base.v * coef + pivot.col;
        row = base.h * coef + pivot.row;

        // skip if out of bounds
        if (
          0 > col ||
          col >= environment.gridCols ||
          0 > row ||
          row >= environment.gridRows
        ) {
          continue;
        }

        // add cell if matching played value
        cellValue = gridCols[col][row] || '';
        if (cellValue === value) {
          winningCells.push({ col, row });

          // we have 4 cells !
          if (winningCells.length === 4) {
            return winningCells;
          }
        }

        // reset winning cells list
        else {
          winningCells = [];
        }
      }
    }

    // if we reach here, no more than 3 connected cells
    return null;
  }
}
