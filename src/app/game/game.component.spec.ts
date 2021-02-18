import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Player } from '../shared/player';

import { GameComponent } from './game.component';
import { GameService } from './game.service';
import { GameState } from './state';
import { NgxsModule } from '@ngxs/store';
import { FormsModule } from '@angular/forms';

const gameServiceStub = {
  setup: (p1: Player, p2: Player) => {},
  firstPlayer: new Player('p0', 'ghost'),
  start: () => {},
};

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameComponent],
      imports: [FormsModule, NgxsModule.forRoot([GameState])],
      providers: [
        provideMockStore(),
        { provide: GameService, useValue: gameServiceStub },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow to input players names', async () => {
    await fixture.whenStable();

    // get initial values
    const initialPlayer1Name = component.player1Name;
    const initialPlayer2Name = component.player2Name;

    // get inputs
    const player1NameInput = fixture.nativeElement.querySelector(
      'input[name="player1Name"]'
    );
    const player2NameInput = fixture.nativeElement.querySelector(
      'input[name="player2Name"]'
    );

    // validate inital values
    expect(player1NameInput.value).toBe(initialPlayer1Name);
    expect(player2NameInput.value).toBe(initialPlayer2Name);

    // change values
    player1NameInput.value = 'Batman';
    player1NameInput.dispatchEvent(new Event('input'));
    player2NameInput.value = 'Superman';
    player2NameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(player1NameInput.value).toBe('Batman');
    expect(player2NameInput.value).toBe('Superman');
  });

  it('should allow to setup the game with players names', async () => {
    await fixture.whenStable();
    const gameSetupSpy = spyOn(gameServiceStub, 'setup');

    // get inputs
    const player1NameInput = fixture.nativeElement.querySelector(
      'input[name="player1Name"]'
    );
    const player2NameInput = fixture.nativeElement.querySelector(
      'input[name="player2Name"]'
    );

    // change values
    player1NameInput.value = 'Batman';
    player1NameInput.dispatchEvent(new Event('input'));
    player2NameInput.value = 'Superman';
    player2NameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // clic start
    fixture.nativeElement.querySelector('.game__settings__start').click();

    // game service has been called
    expect(gameSetupSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({ name: 'Batman' }),
      jasmine.objectContaining({ name: 'Superman' })
    );
  });

  it('should display first player upon starting the game', async () => {
    await fixture.whenStable();

    // clic start
    fixture.nativeElement.querySelector('.game__settings__start').click();
    await fixture.whenStable();
    fixture.detectChanges();

    // we see first player announcement
    const announcementElement = fixture.nativeElement.querySelector(
      '.game__announcement__first-player'
    );
    expect(announcementElement).toBeTruthy();
  });

  it('should starts the game', fakeAsync(() => {
    fixture.whenStable();
    const gameStartSpy = spyOn(gameServiceStub, 'start');

    // clic start
    fixture.nativeElement.querySelector('.game__settings__start').click();

    // wait for announcement to be removed
    tick(3000);

    // game service has been called
    expect(gameStartSpy).toHaveBeenCalled();
  }));
});
