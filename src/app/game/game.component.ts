import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Player } from '../shared/player';
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

  constructor(private store: Store, private game: GameService) {}

  ngOnInit(): void {
    this.isGameStarted$ = this.store.select(GameState.isStarted);
    this.isGameOver$ = this.store.select(GameState.isOver);
    this.activePlayer$ = this.store.select(GameState.activePlayer);
    this.winner$ = this.store.select(GameState.winner);
  }

  /**
   * Resets the game state
   */
  onExitGame(): void {
    this.game.clear();
  }
}
