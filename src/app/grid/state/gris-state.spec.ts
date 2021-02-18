import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { GameState } from 'src/app/game/state';
import { NextPlayer } from 'src/app/game/state/actions/NextPlayer.action';
import { environment } from 'src/environments/environment';
import { GridState } from '.';
import { PlayCoin } from './actions/PlayCoin.action';
import { Reset } from './actions/Reset.action';

describe('GridState', () => {
  let store: Store;

  // /**
  //  * Get the active player from the game state.
  //  */
  // const getActivePlayer = () =>
  //   store.selectSnapshot((state) => state.game.activePlayer);

  /**
   * Get the grid columms from the grid state.
   */
  const getGridCols = () => store.selectSnapshot((state) => state.grid.cols);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([GridState])],
    });

    store = TestBed.inject(Store);
  });

  it('can reset the grid', () => {
    let cols: number[][];

    // fill the grid
    store.dispatch(new PlayCoin('P1', 1));
    store.dispatch(new PlayCoin('P2', 2));
    store.dispatch(new PlayCoin('P1', 3));
    cols = getGridCols();
    expect(cols.every((col) => col.length === 0)).toBe(true);

    // reset the grid
    store.dispatch(new Reset());

    // all cols are empty
    cols = getGridCols();
    expect(cols.every((col) => col.length === 0)).toBe(true);
    expect(cols.length).toBe(environment.gridCols);
  });

  it('can play coin', () => {
    // init the grid
    store.dispatch(new Reset());

    // play first coin
    store.dispatch(new PlayCoin('P1', 2));

    // col 2 has exactly 1 coin of player 1
    const cols = getGridCols();
    expect(cols[2]).toEqual([1]);

    // play coin for next player
    store.dispatch(new NextPlayer());
    store.dispatch(new PlayCoin('P2', 2));

    // col 2 now has 1 coin of each player
    expect(cols[2]).toEqual([1, 2]);
  });
});
