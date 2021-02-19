import {
  fakeAsync,
  flush,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing';
import { GameService } from './game.service';
import { NgxsModule, Store } from '@ngxs/store';
import { GameState } from './state';
import { GridState } from '../grid/state';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { Observable, zip } from 'rxjs';
import * as Grid from '../grid/state/actions';
import * as Game from './state/actions';
import { Player } from '../shared/player';
import { GRID_COLS, GRID_ROWS } from '../grid/config';

describe('GameService', () => {
  let game: GameService;
  let store: Store;
  let players: Player[];
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([GameState, GridState])],
    });

    store = TestBed.inject(Store);
    game = TestBed.inject(GameService);
    actions$ = TestBed.inject(Actions);
    players = [new Player('p1', 'Batman'), new Player('p2', 'Superman')];
    game.setup(players[0], players[1]);
  });

  it('should be created', () => {
    expect(game).toBeTruthy();
  });

  it('can start the game', (done) => {
    // define expected actions
    zip(
      actions$.pipe(ofActionDispatched(Grid.Reset)),
      actions$.pipe(ofActionDispatched(Game.Start))
    ).subscribe((dispatchedActions) => {
      expect(dispatchedActions.length).toBe(2);
      done();
    });

    game.start();
  });

  it('can clear the game', (done) => {
    // define expected actions
    zip(actions$.pipe(ofActionDispatched(Game.Clear))).subscribe(
      (dispatchedActions) => {
        expect(dispatchedActions.length).toBe(1);
        done();
      }
    );

    game.clear();
  });

  it('can play a coin', (done) => {
    // define expected actions
    actions$.pipe(ofActionDispatched(Grid.PlayCoin)).subscribe((payload) => {
      expect(payload.col).toBe(2);
    });
    zip(
      actions$.pipe(ofActionDispatched(Grid.PlayCoin)),
      actions$.pipe(ofActionDispatched(Game.NextPlayer))
    ).subscribe((dispatchedActions) => {
      expect(dispatchedActions.length).toBe(2);
      done();
    });

    // play a coin
    game.start();
    game.play(2);
  });

  it('cannnot play a coin if game has not started', () => {
    expect(() => game.play(2)).toThrowError(
      '[Game Service] The game has not started, play() is not allowed.'
    );
  });

  it('cannnot play a coin if column is full', () => {
    // start the game and fill column 2
    game.start();
    for (let i = 0; i < GRID_ROWS; i++) {
      game.play(2);
    }

    // column 2 is full, no coin is played
    const storeDispatchSpy = spyOn(store, 'dispatch');
    game.play(2);
    expect(storeDispatchSpy).not.toHaveBeenCalled();
  });

  it('ends the game if grid is full', (done) => {
    // define expected actions
    zip(actions$.pipe(ofActionDispatched(Game.End))).subscribe(
      (dispatchedActions) => {
        expect(dispatchedActions.length).toBe(1);
        done();
      }
    );

    // start game
    store.dispatch(new Game.SetFirstPlayer(players[0]));
    game.start();

    // fill board except on col 0
    for (let col = 0; col < GRID_COLS; col++) {
      for (let row = 0; row < GRID_ROWS; row++) {
        if (col === 0 && row === GRID_ROWS - 1) {
          continue;
        }

        store.dispatch(new Grid.PlayCoin(players[1], col));
      }
    }

    // play last spot
    game.play(0);
  });

  it('sets the game as won if 4 cells connected horizontally', (done) => {
    // define expected actions
    zip(
      actions$.pipe(ofActionDispatched(Grid.HighlightCells)),
      actions$.pipe(ofActionDispatched(Game.Won))
    ).subscribe((dispatchedActions) => {
      expect(dispatchedActions[0].cells.length).toBe(4);
      expect(dispatchedActions[1].winner).toEqual(players[0]);
      expect(dispatchedActions.length).toBe(2);
      done();
    });

    // start game
    store.dispatch(new Game.SetFirstPlayer(players[0]));
    game.start();

    // set grid
    store.dispatch(new Grid.PlayCoin(players[0], 2));
    store.dispatch(new Grid.PlayCoin(players[0], 3));
    store.dispatch(new Grid.PlayCoin(players[0], 4));

    // play winning move
    game.play(5);
  });

  it('sets the game as won if 4 cells connected vertically', (done) => {
    // define expected actions
    zip(
      actions$.pipe(ofActionDispatched(Grid.HighlightCells)),
      actions$.pipe(ofActionDispatched(Game.Won))
    ).subscribe((dispatchedActions) => {
      expect(dispatchedActions[0].cells.length).toBe(4);
      expect(dispatchedActions[1].winner).toEqual(players[0]);
      expect(dispatchedActions.length).toBe(2);
      done();
    });

    // start game
    store.dispatch(new Game.SetFirstPlayer(players[0]));
    game.start();

    // set grid
    store.dispatch(new Grid.PlayCoin(players[0], 2));
    store.dispatch(new Grid.PlayCoin(players[0], 2));
    store.dispatch(new Grid.PlayCoin(players[0], 2));

    // play winning move
    game.play(2);
  });

  it('sets the game as won if 4 cells connected in backward diagonal', (done) => {
    // define expected actions
    zip(
      actions$.pipe(ofActionDispatched(Grid.HighlightCells)),
      actions$.pipe(ofActionDispatched(Game.Won))
    ).subscribe((dispatchedActions) => {
      expect(dispatchedActions[0].cells.length).toBe(4);
      expect(dispatchedActions[1].winner).toEqual(players[0]);
      expect(dispatchedActions.length).toBe(2);
      done();
    });

    // start game
    store.dispatch(new Game.SetFirstPlayer(players[0]));
    game.start();

    // set grid
    store.dispatch(new Grid.PlayCoin(players[1], 2));
    store.dispatch(new Grid.PlayCoin(players[1], 2));
    store.dispatch(new Grid.PlayCoin(players[1], 2));

    store.dispatch(new Grid.PlayCoin(players[1], 3));
    store.dispatch(new Grid.PlayCoin(players[1], 3));
    store.dispatch(new Grid.PlayCoin(players[0], 3));

    store.dispatch(new Grid.PlayCoin(players[1], 4));
    store.dispatch(new Grid.PlayCoin(players[0], 4));

    store.dispatch(new Grid.PlayCoin(players[0], 5));

    // play winning move
    game.play(2);
  });

  it('sets the game as won if 4 cells connected in forward diagonal', (done) => {
    // define expected actions
    zip(
      actions$.pipe(ofActionDispatched(Grid.HighlightCells)),
      actions$.pipe(ofActionDispatched(Game.Won))
    ).subscribe((dispatchedActions) => {
      expect(dispatchedActions[0].cells.length).toBe(4);
      expect(dispatchedActions[1].winner).toEqual(players[0]);
      expect(dispatchedActions.length).toBe(2);
      done();
    });

    // start game
    store.dispatch(new Game.SetFirstPlayer(players[0]));
    game.start();

    // set grid
    store.dispatch(new Grid.PlayCoin(players[0], 2));

    store.dispatch(new Grid.PlayCoin(players[1], 3));
    store.dispatch(new Grid.PlayCoin(players[0], 3));

    store.dispatch(new Grid.PlayCoin(players[1], 4));
    store.dispatch(new Grid.PlayCoin(players[1], 4));
    store.dispatch(new Grid.PlayCoin(players[0], 4));

    store.dispatch(new Grid.PlayCoin(players[1], 5));
    store.dispatch(new Grid.PlayCoin(players[1], 5));
    store.dispatch(new Grid.PlayCoin(players[1], 5));

    // play winning move
    game.play(5);
  });
});
