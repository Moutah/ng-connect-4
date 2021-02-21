import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Player } from '../player';
import { GameService } from '../services/game.service';
import { GameState } from '../state';
import { NgxsModule, Store } from '@ngxs/store';
import { FormsModule } from '@angular/forms';
import { PlayerSetupComponent } from './player-setup.component';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const gameServiceStub = {
  setup: (p1: Player, p2: Player) => {},
  start: () => {},
};

describe('PlayerSetupComponent', () => {
  let component: PlayerSetupComponent;
  let fixture: ComponentFixture<PlayerSetupComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerSetupComponent],
      imports: [
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        NgxsModule.forRoot([GameState]),
      ],
      providers: [{ provide: GameService, useValue: gameServiceStub }],
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can setup the game with players of custom names and start the game', () => {
    const gameSetupSpy = spyOn(gameServiceStub, 'setup');

    // get inputs
    const player1NameInput = fixture.nativeElement.querySelector(
      'input[name="player1Name"]'
    );
    const player2NameInput = fixture.nativeElement.querySelector(
      'input[name="player2Name"]'
    );

    // change values
    player1NameInput.value = 'Joker';
    player1NameInput.dispatchEvent(new Event('input'));
    player2NameInput.value = 'Lex';
    player2NameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // clic start
    fixture.nativeElement.querySelector('.player-setup__finish-button').click();

    // game service has been called
    expect(gameSetupSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({ name: 'Joker' }),
      jasmine.objectContaining({ name: 'Lex' })
    );
  });

  it('can setup the game with player 2 as AI', () => {
    const gameSetupSpy = spyOn(gameServiceStub, 'setup');

    // tick AI checkbox
    const player2AiCheckbox = fixture.nativeElement.querySelector(
      'input[name="player2Ai"]'
    );
    player2AiCheckbox.click();
    player2AiCheckbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    // clic start
    fixture.nativeElement.querySelector('.player-setup__finish-button').click();

    // game service has been called
    expect(gameSetupSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({ name: 'Batman', isAi: false }),
      jasmine.objectContaining({ name: 'Superman', isAi: true })
    );
  });

  it('displays starting player announcement when first player selected', () => {
    // simulate firstPlayer selected
    Object.defineProperty(component, 'firstPlayer$', { writable: true });
    component.firstPlayer$ = of(new Player('p0', 'Ghost'));
    fixture.detectChanges();

    // we see first player announcement
    const announcementElement = fixture.nativeElement.querySelector(
      '.player-setup__announcement'
    );
    expect(announcementElement).toBeTruthy();
  });

  it('starts the game after a short wait', fakeAsync(() => {
    const gameStartSpy = spyOn(gameServiceStub, 'start');

    // clic start
    fixture.nativeElement.querySelector('.player-setup__finish-button').click();
    fixture.detectChanges();

    // game not started immediately
    expect(gameStartSpy).not.toHaveBeenCalled();

    // game started after a while
    tick(3000);
    expect(gameStartSpy).toHaveBeenCalled();
  }));
});
