import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Player } from './player';
import { GameService } from './game.service';
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

  constructor(private store: Store, private game: GameService) {}

  ngOnInit(): void {
    this.isGameStarted$ = this.store.select(GameState.isStarted);
    this.isGameOver$ = this.store.select(GameState.isOver);
    this.activePlayer$ = this.store.select(GameState.activePlayer);
    this.winner$ = this.store.select(GameState.winner);
    this.isGridVeiled = true;
    this.isGridUnveiled = false;

    // unveil grid upon game starting
    this.isGameStarted$.subscribe(async (value) => {
      console.log('isGameStarted$', value);
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
