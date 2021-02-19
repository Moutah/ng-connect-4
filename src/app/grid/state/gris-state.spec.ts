import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { Player } from 'src/app/shared/player';
import { GridState } from '.';
import * as Grid from './actions';
import * as Game from '../../game/state/actions';
import { GRID_COLS } from '../config';

describe('GridState', () => {
  let store: Store;
  let players: Player[];

  /**
   * Get the grid columms from the grid state.
   */
  const getGridCols = () => store.selectSnapshot((state) => state.grid.cols);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([GridState])],
    });

    store = TestBed.inject(Store);
    players = [new Player('p1', 'Batman'), new Player('p2', 'Superman')];
    store.dispatch(new Game.SetPlayers(players[0], players[1]));
  });

  it('can reset the grid', () => {
    let cols: number[][];

    // fill the grid
    store.dispatch(new Grid.PlayCoin(players[0], 1));
    store.dispatch(new Grid.PlayCoin(players[1], 2));
    store.dispatch(new Grid.PlayCoin(players[0], 3));
    cols = getGridCols();
    expect(cols.every((col) => col.length === 0)).toBe(true);

    // reset the grid
    store.dispatch(new Grid.Reset());

    // all cols are empty
    cols = getGridCols();
    expect(cols.every((col) => col.length === 0)).toBe(true);
    expect(cols.length).toBe(GRID_COLS);
  });

  it('can play coin', () => {
    // init the grid
    store.dispatch(new Grid.Reset());

    // play first coin
    store.dispatch(new Grid.PlayCoin(players[0], 2));

    // col 2 has exactly 1 coin of player 1
    const cols = getGridCols();
    expect(cols[2]).toEqual([players[0].id]);

    // play coin for other player
    store.dispatch(new Grid.PlayCoin(players[1], 2));

    // col 2 now has 1 coin of each player
    expect(cols[2]).toEqual([players[0].id, players[1].id]);
  });

  it('can set some cells as highlighted', () => {});
});
