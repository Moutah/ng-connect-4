import { Component, OnInit, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Player } from '../player';
import { GameService } from '../services/game.service';
import { GameState } from '../state';

@Component({
  selector: 'app-player-setup',
  templateUrl: './player-setup.component.html',
  styleUrls: ['./player-setup.component.scss'],
})
export class PlayerSetupComponent implements OnInit {
  firstPlayer$: Observable<Player>;
  isAnnouncementReady = false;
  isPlayingAgainstAi = true;

  private announcementDuration = 1600;

  // default input values
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
      new Player('player-1', this.player1Name),
      new Player('player-2', this.player2Name, this.isPlayingAgainstAi)
    );

    // hide announcement animation
    setTimeout(() => {
      this.isAnnouncementReady = true;
    }, this.announcementDuration * 0.6);

    // starts the game after quick wait to display starting player
    setTimeout(() => this.game.start(), 1.6 * this.announcementDuration);
  }
}
