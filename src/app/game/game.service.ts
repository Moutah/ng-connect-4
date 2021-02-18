import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import * as Grid from '../grid/state/actions';
import * as Game from './state/actions';
import { GameState } from './state';
import { Player } from '../shared/player';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  firstPlayer?: Player;

  constructor(private store: Store) {}

  /**
   * Initilaize the game's players.
   */
  setup(player1: Player, player2: Player): void {
    this.store.dispatch(new Game.SetPlayers(player1, player2));
    this.firstPlayer = Math.random() > 0.5 ? player1 : player2;
  }

  /**
   * Starts the game :)
   */
  start(): void {
    // reset the grid and starts the game
    this.store.dispatch(new Grid.Reset());
    this.store.dispatch(new Game.Start(this.firstPlayer));
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
    const activePlayer = this.store.selectSnapshot(GameState.activePlayer);
    this.store.dispatch(new Grid.PlayCoin(activePlayer, col));

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
