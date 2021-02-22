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
  private isAwaken = false;
  private monkeyMovesRatio = 0.2;

  constructor(private store: Store, private game: GameService) {
    this.newTurn$ = this.store.select(GameState.activePlayer);
    this.gameOver$ = this.store.select(GameState.isOver);
  }

  /**
   * Returns `true` if service was awaken already
   */
  isAwake(): boolean {
    return this.isAwaken;
  }

  /**
   * Make the AI aware of game starting / stopping.
   */
  awake(): void {
    // do not awake twice
    if (this.isAwaken) {
      return;
    }

    // start / stop with game
    this.gameOver$.subscribe((isGameOver) => {
      isGameOver ? this.stop() : this.start();
    });

    // mark as awake
    this.isAwaken = true;
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
   * Will look for a smart move 80% of the time or just play randomly the
   * remaining 20%.
   */
  play(): void {
    const colToPlay =
      Math.random() > this.monkeyMovesRatio
        ? this.getSmartMove()
        : this.getRandomMove();
    this.game.play(colToPlay);
  }

  /**
   * Play in a randomly choosen non-full column.
   */
  getRandomMove(): number {
    // get current grid
    const gridCols: string[][] = this.store.selectSnapshot(
      (state) => state.grid.cols
    );

    // play a random colum
    const validCols = this.getOpenColumns(gridCols);
    return validCols[Math.floor(Math.random() * validCols.length)];
  }

  /**
   * Play in a randomly choose non-full column.
   */
  getSmartMove(): number {
    // get current grid
    const gridCols: string[][] = this.store.selectSnapshot(
      (state) => state.grid.cols
    );

    // get players
    const aiPlayer = this.store.selectSnapshot(
      (state) => state.game.activePlayer
    );
    const opponent = this.store.selectSnapshot(
      (state) =>
        state.game.players.filter((player: Player) => player !== aiPlayer)[0]
    );

    // play winning moves
    const winningMove = this.getWinningMove(aiPlayer, gridCols);
    if (winningMove !== null) {
      return winningMove;
    }

    // defend against threats
    const defensiveMove = this.getWinningMove(opponent, gridCols);
    if (defensiveMove !== null) {
      return defensiveMove;
    }

    // play a random colum
    return this.getRandomMove();
  }

  /**
   * Unsubscrtibe from activePlayer$.
   */
  stop(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  /**
   * Simulate given `player` playing in every open column. Returns a column
   * index if playing in that column is a winning move, `null` otherwise.
   */
  private getWinningMove(player: Player, gridCols: string[][]): number | null {
    const validCols = this.getOpenColumns(gridCols);

    // simulate playing in each column
    for (const col of validCols) {
      const theoricGridCols = this.getGridColsWithNewMove(
        player,
        col,
        gridCols
      );

      // this col is a winning move
      if (this.game.getWinningCells(col, theoricGridCols)) {
        return col;
      }
    }

    // no winning move found
    return null;
  }

  /**
   * Returns a copy of given `gridCols` with the addition of a simulated move
   * by given `player` in given `col`.
   */
  private getGridColsWithNewMove(
    player: Player,
    col: number,
    gridCols: string[][]
  ): string[][] {
    // add a mmove
    const gridColsWithNextMove = gridCols.map((row) => [...row]);
    gridColsWithNextMove[col].push(player.color);

    return gridColsWithNextMove;
  }

  /**
   * Returns the columns indexes in given `gridCols` that are not full.
   */
  private getOpenColumns(gridCols: string[][]): number[] {
    return gridCols
      .map((rows, iCol) => (rows.length < GRID_ROWS ? iCol : null))
      .filter((iCol) => iCol !== null);
  }
}
