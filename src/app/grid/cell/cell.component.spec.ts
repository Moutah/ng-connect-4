import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { GameService } from 'src/app/game/services/game.service';
import { MaterialModule } from 'src/app/material.module';
import { Player } from 'src/app/game/player';
import { GRID_ROWS } from '../config';
import { GridState } from '../state';
import * as Grid from '../state/actions';
import * as Game from '../../game/state/actions';
import { CellComponent } from './cell.component';
import { CoinComponent } from '../coin/coin.component';
import { GameState } from 'src/app/game/state';

const gameServiceStub = {
  play: (col: number) => {},
};

describe('CellComponent', () => {
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CellComponent, CoinComponent],
      imports: [MaterialModule, NgxsModule.forRoot([GridState, GameState])],
      providers: [{ provide: GameService, useValue: gameServiceStub }],
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can display as dimmed', () => {
    component.col = 1;
    component.row = 1;

    // dispatch highlight of this cell
    store.dispatch(new Grid.HighlightCells([{ col: 1, row: 1 }]));
    fixture.detectChanges();
    expect(
      fixture.nativeElement
        .querySelector('.cell')
        .classList.contains('cell--dimmed')
    ).toBe(false);

    // dispatch highlight of other cell
    store.dispatch(new Grid.HighlightCells([{ col: 1, row: 0 }]));
    fixture.detectChanges();
    expect(
      fixture.nativeElement
        .querySelector('.cell')
        .classList.contains('cell--dimmed')
    ).toBe(true);
  });

  it('calculates fall height depending on given row prop', () => {
    // reboot component
    component.row = 1;
    component.ngOnInit();

    expect(component.fallHeight).toBe(GRID_ROWS - 1);
  });

  it('can display coin', async () => {
    const playerA = new Player('player-1', 'Player A');
    const getCellContentEl = () =>
      fixture.nativeElement.querySelector('.cell__content');

    // no coin is displayed at these grid coords
    expect(getCellContentEl().classList.contains('cell__content--hidden')).toBe(
      true
    );

    // dispatch some coin plays
    store.dispatch(new Grid.Reset());
    store.dispatch(new Grid.PlayCoin(playerA.color, 2));

    // reboot component
    component.row = 0;
    component.col = 0;
    component.ngOnInit();
    fixture.detectChanges();

    // no coin displayed at these grid coords
    expect(getCellContentEl().classList.contains('cell__content--hidden')).toBe(
      true
    );

    // reboot component
    component.row = 0;
    component.col = 2;
    component.ngOnInit();
    fixture.detectChanges();

    // coin is displayed at these grid coords
    expect(getCellContentEl().classList.contains('cell__content--hidden')).toBe(
      false
    );
  });

  it('triggers play when clicked', () => {
    const gamePlaySpy = spyOn(gameServiceStub, 'play');

    // setup game with player starting
    const players = [
      new Player('p1', 'Batman'),
      new Player('p2', 'Superman', true),
    ];
    store.dispatch(new Game.SetPlayers(players[0], players[1]));
    store.dispatch(new Game.SetFirstPlayer(players[0]));
    store.dispatch(new Game.Start());
    fixture.detectChanges();

    fixture.nativeElement.querySelector('.cell').click();

    expect(gamePlaySpy).toHaveBeenCalled();
  });

  it('does not trigger play when clicked and AI is playing', () => {
    const gamePlaySpy = spyOn(gameServiceStub, 'play');

    // setup game with AI starting
    const players = [
      new Player('p1', 'Batman'),
      new Player('p2', 'Superman', true),
    ];
    store.dispatch(new Game.SetPlayers(players[0], players[1]));
    store.dispatch(new Game.SetFirstPlayer(players[1]));
    store.dispatch(new Game.Start());
    fixture.detectChanges();

    fixture.nativeElement.querySelector('.cell').click();

    expect(gamePlaySpy).not.toHaveBeenCalled();
  });
});
