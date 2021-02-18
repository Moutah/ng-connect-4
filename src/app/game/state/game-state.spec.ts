import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { GameState } from '.';
import { End } from './actions/End.action';
import { NextPlayer } from './actions/NextPlayer.action';
import { Start } from './actions/Start.action';

describe('GameState', () => {
  let store: Store;

  /**
   * Get the active player from the game state.
   */
  const getActivePlayer = () =>
    store.selectSnapshot((state) => state.game.activePlayer);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([GameState])],
    });

    store = TestBed.inject(Store);
  });

  it('can start the game', () => {
    store.dispatch(new Start());

    const isGameOver = store.selectSnapshot((state) => state.game.isOver);
    expect(isGameOver).toBe(false);
  });

  it('can stop the game', () => {
    store.dispatch(new End());

    const isGameOver = store.selectSnapshot((state) => state.game.isOver);
    expect(isGameOver).toBe(true);
  });

  it('can switch palyers turn', () => {
    // initial state
    expect(getActivePlayer()).toBe(1);

    // player 2's turn
    store.dispatch(new NextPlayer());
    expect(getActivePlayer()).toBe(2);

    // back to player 1
    store.dispatch(new NextPlayer());
    expect(getActivePlayer()).toBe(1);
  });
});
