import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GameService } from './game/game.service';
import { GameState } from './game/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isHome$: Observable<boolean>;
  isGameStarted$: Observable<boolean>;

  constructor(
    private router: Router,
    private game: GameService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.isHome$ = this.router.events
      .pipe(
        filter((e: RouterEvent): e is RouterEvent => e instanceof RouterEvent)
      )
      .pipe(map((e: any) => e.urlAfterRedirects === '/'));

    this.isGameStarted$ = this.store.select(GameState.isStarted);
  }

  /**
   * Clear the current game.
   */
  abandonGame(): void {
    this.game.clear();
  }
}
