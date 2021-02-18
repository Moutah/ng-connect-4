import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import * as Grid from '../grid/state/actions';
import * as Game from './state/actions';
import { GameState } from './state';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private store: Store) {}

  /**
   * Starts the game :)
   */
  start(): void {
    // reset the grid and starts the game
    this.store.dispatch(new Grid.Reset());
    this.store.dispatch(new Game.Start());
  }

  /**
   * Ends the game.
   */
  end(): void {
    this.store.dispatch(new Game.End());
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
    const gridCols = this.store.selectSnapshot((store) => store.grid.cols);
    if (gridCols[col].length >= environment.gridRows) {
      throw new Error('[Game Service] Targeted column is full!');
    }

    // play coin for active player
    const activePlayerCode = this.store.selectSnapshot(
      GameState.activePlayerCode
    );
    this.store.dispatch(new Grid.PlayCoin(activePlayerCode, col));

    // check if game over
    if (this.isWon(col)) {
      this.store.dispatch(new Game.End());
      return;
    }

    this.store.dispatch(new Game.NextPlayer());
  }

  /**
   * Checks if the lastly played coin completes a line of 4.
   */
  private isWon(lastlyPlayedCol: number): boolean {
    // TODO
    return false;
  }
}
