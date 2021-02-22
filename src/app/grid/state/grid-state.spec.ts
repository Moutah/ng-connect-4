import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { Player } from 'src/app/game/player';
import { GridState } from '.';
import * as Grid from './actions';
import * as Game from '../../game/state/actions';
import { GRID_COLS } from '../config';

describe('GridState', () => {
  let store: Store;
  let players: Player[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([GridState])],
    });

    store = TestBed.inject(Store);
    players = [new Player('p1', 'Batman'), new Player('p2', 'Superman')];
    store.dispatch(new Game.SetPlayers(players[0], players[1]));
  });

  it('can reset the grid', () => {
    let cols: string[][];

    // fill the grid
    store.dispatch(new Grid.PlayCoin(players[0].color, 1));
    store.dispatch(new Grid.PlayCoin(players[1].color, 2));
    store.dispatch(new Grid.PlayCoin(players[0].color, 3));
    cols = store.selectSnapshot((state) => state.grid.cols);
    expect(cols.every((col) => col.length === 0)).toBe(true);

    // reset the grid
    store.dispatch(new Grid.Reset());

    // all cols are empty
    cols = store.selectSnapshot((state) => state.grid.cols);
    expect(cols.every((col) => col.length === 0)).toBe(true);
    expect(cols.length).toBe(GRID_COLS);
  });

  it('can play coin', () => {
    // init the grid
    store.dispatch(new Grid.Reset());

    // play first coin
    store.dispatch(new Grid.PlayCoin(players[0].color, 2));

    // col 2 has exactly 1 coin of player 1
    const cols = store.selectSnapshot((state) => state.grid.cols);
    expect(cols[2]).toEqual([players[0].color]);

    // play coin for other player
    store.dispatch(new Grid.PlayCoin(players[1].color, 2));

    // col 2 now has 1 coin of each player
    expect(cols[2]).toEqual([players[0].color, players[1].color]);
  });

  it('can set some cells as highlighted', () => {
    // mark some cells as highlighted
    const cellCoordA = { col: 0, row: 1 };
    const cellCoordB = { col: 1, row: 1 };
    store.dispatch(new Grid.HighlightCells([cellCoordA, cellCoordB]));

    const gridHighlights = store.selectSnapshot(
      (state) => state.grid.highlights
    );
    expect(gridHighlights.length).toBe(2);
    expect(gridHighlights[0]).toEqual(cellCoordA);
    expect(gridHighlights[1]).toEqual(cellCoordB);
  });
});
