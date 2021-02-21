import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { GameService } from './game/services/game.service';
import { GameState } from './game/state';

const gameServiceStub = {
  clear: () => {},
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  /**
   * Hijack given `observableName` observable in `component` and give it given
   * `value`.
   */
  const simulateObservatorValue = (observableName: string, value: any) => {
    Object.defineProperty(component, observableName, { writable: true });
    component[observableName] = of(value);
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NgxsModule.forRoot([GameState])],
      providers: [{ provide: GameService, useValue: gameServiceStub }],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('displays abandon menu only when game started', () => {
    const hasAbandonMenu = () =>
      Array.from(
        fixture.nativeElement.querySelectorAll('mat-nav-list a')
      ).filter((el: HTMLElement) => el.textContent === 'Abandon game').length >
      0;

    // initial state
    expect(hasAbandonMenu()).toBe(false);

    // set observables
    simulateObservatorValue('isGameStarted$', true);

    expect(hasAbandonMenu()).toBe(true);
  });

  it('clears the game upon abandonning', () => {
    const gameClearSpy = spyOn(gameServiceStub, 'clear');

    // simulate started game
    simulateObservatorValue('isGameStarted$', true);

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
