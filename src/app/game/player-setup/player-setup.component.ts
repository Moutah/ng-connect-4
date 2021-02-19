import { Component, OnInit, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Player } from 'src/app/shared/player';
import { GameService } from '../game.service';
import { GameState } from '../state';

@Component({
  selector: 'app-player-setup',
  templateUrl: './player-setup.component.html',
  styleUrls: ['./player-setup.component.scss'],
})
export class PlayerSetupComponent implements OnInit {
  firstPlayer$: Observable<Player>;

  player1Name = 'Red';
  player2Name = 'Yellow';

  constructor(private store: Store, private game: GameService) {}

  ngOnInit(): void {
    this.firstPlayer$ = this.store.select(GameState.firstPlayer);
  }

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
}
