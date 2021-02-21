import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Player } from './player';
import { AiService } from './services/ai.service';
import { GameService } from './services/game.service';
import { GameState } from './state';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  isGameStarted$: Observable<boolean>;
  isGameOver$: Observable<boolean>;
  activePlayer$: Observable<Player>;
  winner$: Observable<Player>;

  isGridVeiled: boolean;
  isGridUnveiled: boolean;
  timerOffset = 0;

  constructor(
    private store: Store,
    private game: GameService,
    private ai: AiService
  ) {}

  ngOnInit(): void {
    this.isGameStarted$ = this.store.select(GameState.isStarted);
    this.isGameOver$ = this.store.select(GameState.isOver);
    this.activePlayer$ = this.store.select(GameState.activePlayer);
    this.winner$ = this.store.select(GameState.winner);
    this.isGridVeiled = true;
    this.isGridUnveiled = false;

    // prep IA
    this.ai.awake();

    // sets timer offset
    this.store.selectSnapshot((state) => {
      // no start timestamp in store
      if (!state.game.startTimestamp) {
        this.timerOffset = 0;
        return;
      }

      // calc offset in seconds
      const now = new Date().getTime();
      this.timerOffset = Math.round((now - state.game.startTimestamp) / 1000);
    });

    // unveil grid upon game starting
    this.isGameStarted$.subscribe(async (value) => {
      if (value) {
        await this.unveilGame();
        this.isGridUnveiled = true;
      }
    });
  }

  private unveilGame(): Promise<void> {
    return new Promise((resolve) => {
      // defer game unveiling to trigger animation
      window.setTimeout(() => {
        this.isGridVeiled = false;
      }, 10);

      // wait for css animation
      window.setTimeout(resolve, 800);
    });
  }

  /**
   * Resets the game state
   */
  onExitGame(): void {
    this.game.clear();
  }
}
