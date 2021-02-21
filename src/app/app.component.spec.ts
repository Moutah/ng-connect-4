import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ReplaySubject } from 'rxjs';
import { AppComponent } from './app.component';
import { GameService } from './game/services/game.service';
import { GameState } from './game/state';
import * as Game from './game/state/actions';

const gameServiceStub = {
  clear: () => {},
};
const eventSubject = new ReplaySubject<RouterEvent>(1);
const routerStub = {
  events: eventSubject.asObservable(),
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // RouterTestingModule,
        NgxsModule.forRoot([GameState]),
      ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: GameService, useValue: gameServiceStub },
      ],
      declarations: [AppComponent],
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('displays abandon menu only on game page when game started', () => {
    const hasAbandonMenu = () =>
      Array.from(
        fixture.nativeElement.querySelectorAll('mat-nav-list a')
      ).filter((el: HTMLElement) => el.textContent === 'Abandon game').length >
      0;

    // initial state
    expect(hasAbandonMenu()).toBe(false);

    // game page alone is not enough
    eventSubject.next(new NavigationEnd(1, '/game', '/game'));
    fixture.detectChanges();
    expect(hasAbandonMenu()).toBe(false);

    // displayed when game started
    store.dispatch(new Game.Start());
    fixture.detectChanges();
    expect(hasAbandonMenu()).toBe(true);
  });

  it('displays return to game menu only when game started and not on game page', () => {
    const hasReturnToGameMenu = () =>
      Array.from(
        fixture.nativeElement.querySelectorAll('mat-nav-list a')
      ).filter((el: HTMLElement) => el.textContent === 'Back to game').length >
      0;

    // initial state
    expect(hasReturnToGameMenu()).toBe(false);

    // game started alone is not enough
    store.dispatch(new Game.Start());
    eventSubject.next(new NavigationEnd(1, '/game', '/game'));
    fixture.detectChanges();
    expect(hasReturnToGameMenu()).toBe(false);

    // displayed when game started
    eventSubject.next(new NavigationEnd(1, '/', '/'));
    fixture.detectChanges();
    expect(hasReturnToGameMenu()).toBe(true);
  });

  it('clears the game upon abandonning', () => {
    const gameClearSpy = spyOn(gameServiceStub, 'clear');

    // simulate started game
    store.dispatch(new Game.Start());
    eventSubject.next(new NavigationEnd(1, '/game', '/game'));
    fixture.detectChanges();

    // click on abandon
    const abandonMenu = Array.from(
      fixture.nativeElement.querySelectorAll('mat-nav-list a')
    ).filter(
      (el: HTMLElement) => el.textContent === 'Abandon game'
    )[0] as HTMLElement;
    abandonMenu.click();

    expect(gameClearSpy).toHaveBeenCalled();
  });
});
