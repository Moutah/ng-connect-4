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
  firstPlayer$: Observable<Player>;
  activePlayer$: Observable<Player>;
  winner$: Observable<Player>;

  player1Name = 'Red';
  player2Name = 'Yellow';

  constructor(private store: Store, private game: GameService) {
    this.isGameStarted$ = this.store.select(GameState.isStarted);
    this.isGameOver$ = this.store.select(GameState.isOver);
    this.firstPlayer$ = this.store.select(GameState.firstPlayer);
    this.activePlayer$ = this.store.select(GameState.activePlayer);
    this.winner$ = this.store.select(GameState.winner);
  }

  ngOnInit(): void {}

  /**
   * Starts the game with player names as entered by the user.
   */
  onStartGame(): void {
    // set players
    this.game.setup(
      new Player('p1', this.player1Name),
      new Player('p2', this.player2Name)
    );

    // starts the game after quick wait to display starting player
    setTimeout(() => this.game.start(), 2200);
  }

  /**
   * Resets the game state
   */
  onExitGame(): void {
    this.game.clear();
  }
}
