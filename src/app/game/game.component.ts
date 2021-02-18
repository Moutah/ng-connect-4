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
  activePlayer$: Observable<Player>;
  startingPlayer: Player;
  player1Name = 'Red';
  player2Name = 'Yellow';

  constructor(private store: Store, private game: GameService) {
    this.isGameStarted$ = this.store.select(GameState.isStarted);
    this.activePlayer$ = this.store.select(GameState.activePlayer);
  }

  ngOnInit(): void {}

  onStratGame(): void {
    // set players
    this.game.setup(
      new Player('p1', this.player1Name),
      new Player('p2', this.player2Name)
    );

    // get first player
    this.startingPlayer = this.game.firstPlayer;

    // starts the game after quick wait to display starting player
    setTimeout(() => this.game.start(), 2200);
  }
}
