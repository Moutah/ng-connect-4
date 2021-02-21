import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GameService } from './game/services/game.service';
import { GameState } from './game/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isHomePage: boolean;
  isGamePage: boolean;
  isGameStarted: boolean;
  otherTheme: string;
  appDomainUrl: string;
  private subs$: Subscription[] = [];

  constructor(
    private router: Router,
    private game: GameService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.appDomainUrl = window.location.origin;

    // update page from router events
    this.subs$.push(
      this.router.events
        .pipe(
          filter((e: RouterEvent): e is RouterEvent => e instanceof RouterEvent)
        )
        .subscribe((e: any) => {
          this.isHomePage = e.urlAfterRedirects === '/';
          this.isGamePage = e.urlAfterRedirects === '/game';
        })
    );
    this.subs$.push(
      this.store
        .select(GameState.isStarted)
        .subscribe((isStarted) => (this.isGameStarted = isStarted))
    );

    // set initial theme
    const isDarkModePrefered =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setTheme(isDarkModePrefered ? 'dark' : 'light');
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub$) => sub$.unsubscribe());
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
