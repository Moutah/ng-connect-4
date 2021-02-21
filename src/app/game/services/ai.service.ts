import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { GRID_ROWS } from 'src/app/grid/config';
import { Player } from '../player';
import { GameState } from '../state';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private newTurn$: Observable<Player>;
  private gameOver$: Observable<boolean>;
  private subscriptions: Subscription[] = [];
  private thinkTime = 600;
  isAwake = false;

  constructor(private store: Store, private game: GameService) {
    this.newTurn$ = this.store.select(GameState.activePlayer);
    this.gameOver$ = this.store.select(GameState.isOver);
  }

  /**
   * Make the AI aware of game starting / stopping.
   */
  awake(): void {
    // do not awake twice
    if (this.isAwake) {
      return;
    }

    // start / stop with game
    this.gameOver$.subscribe((isGameOver) =>
      isGameOver ? this.stop() : this.start()
    );

    // mark as awake
    this.isAwake = true;
  }

  /**
   * Subscribe to active player change. When it's AI's turn, play after
   * thinking for a bit.
   */
  start(): void {
    // subscribe to new turns
    this.subscriptions.push(
      this.newTurn$.subscribe((activePlayer) => {
        // not IA
        if (!activePlayer?.isAi) {
          return;
        }

        // play after thinking for a bit
        setTimeout(
          () => this.play(),
          (Math.random() * 0.5 + 1) * this.thinkTime
        );
      })
    );
  }

  /**
   * Play in a randomly choose non-full column.
   */
  play(): void {
    const gridCols: string[][] = this.store.selectSnapshot(
      (state) => state.grid.cols
    );

    // pick a non-full column
    let col: number;
    do {
      col = Math.floor(Math.random() * GRID_ROWS);
    } while (gridCols[col].length >= GRID_ROWS);

    // play in that column
    this.game.play(col);
  }

  /**
   * Unsubscrtibe from activePlayer$.
   */
  stop(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
