import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GameService } from './game/services/game.service';
import { GameState } from './game/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isHome$: Observable<boolean>;
  isGameStarted$: Observable<boolean>;
  otherTheme: string;
  appDomainUrl: string;

  constructor(
    private router: Router,
    private game: GameService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.appDomainUrl = window.location.origin;

    // register observables
    this.isHome$ = this.router.events
      .pipe(
        filter((e: RouterEvent): e is RouterEvent => e instanceof RouterEvent)
      )
      .pipe(map((e: any) => e.urlAfterRedirects === '/'));
    this.isGameStarted$ = this.store.select(GameState.isStarted);

    // set initial theme
    const isDarkModePrefered =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setTheme(isDarkModePrefered ? 'dark' : 'light');
  }

  /**
   * Clear the current game.
   */
  abandonGame(): void {
    this.game.clear();
  }

  /**
   * Set given `newTheme` as current theme.
   */
  setTheme(newTheme: string): void {
    document.body.classList.remove('dark');
    document.body.classList.remove('light');
    document.body.classList.add(newTheme);
    this.otherTheme = newTheme === 'light' ? 'dark' : 'light';
  }
}
