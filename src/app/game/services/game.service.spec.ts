import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';
import { NgxsModule, Store, Actions, ofActionDispatched } from '@ngxs/store';
import { GameState } from '../state';
import { GridState } from '../../grid/state';
import { Observable, zip } from 'rxjs';
import * as Grid from '../../grid/state/actions';
import * as Game from '../state/actions';
import { Player } from '../player';
import { GRID_COLS, GRID_ROWS } from '../../grid/config';

describe('GameService', () => {
  let game: GameService;
  let store: Store;
  let players: Player[];
  let actions$: Observable<any>;

  /**
   * Test factory that will set the grid according to given `moves` and test
   * that there are no winning cells detected with given `pivotCol` before
   * playing last move but cells are detected _after_ playing the last move.
   */
  const testConnectedCells = (
    pivotCol: number,
    moves: { playerIdx: number; col: number }[]
  ) => () => {
    let gridCols: string[][];

    // start game
    store.dispatch(new Game.SetFirstPlayer(players[0]));
    game.start();

    // save last move for later
    const lastMove = moves.pop();

    // set grid
    moves.forEach((play) =>
      store.dispatch(new Grid.PlayCoin(players[play.playerIdx].color, play.col))
    );

    // no winning cells found
    gridCols = store.selectSnapshot((state) => state.grid.cols);
    expect(game.getWinningCells(pivotCol, gridCols)).toBe(null);

    // play last move
    store.dispatch(
      new Grid.PlayCoin(players[lastMove.playerIdx].color, lastMove.col)
    );
    expect(game.getWinningCells(pivotCol, gridCols)).toBeTruthy();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([GameState, GridState])],
    });

    store = TestBed.inject(Store);
    game = TestBed.inject(GameService);
    actions$ = TestBed.inject(Actions);

    // setup game
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

        store.dispatch(new Grid.PlayCoin(players[1].color, col));
      }
    }

    // play last spot
    game.play(0);
  });

  it('sets the game as won if 4 cells connected found after a play', (done) => {
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

    // set 4 connected cells in grid
    store.dispatch(new Grid.PlayCoin(players[0].color, 2));
    store.dispatch(new Grid.PlayCoin(players[0].color, 3));
    store.dispatch(new Grid.PlayCoin(players[0].color, 4));

    // play winning move
    game.play(5);
  });

  it(
    'can detect N cells connected horizontally',
    testConnectedCells(3, [
      { playerIdx: 0, col: 2 },
      { playerIdx: 0, col: 3 },
      { playerIdx: 0, col: 4 },
      { playerIdx: 0, col: 5 },
    ])
  );

  it(
    'can detect N cells connected vertically',
    testConnectedCells(2, [
      { playerIdx: 0, col: 2 },
      { playerIdx: 0, col: 2 },
      { playerIdx: 0, col: 2 },
      { playerIdx: 0, col: 2 },
    ])
  );

  it(
    'can detect N cells connected in backward diagonal',
    testConnectedCells(3, [
      { playerIdx: 1, col: 2 },
      { playerIdx: 1, col: 2 },
      { playerIdx: 1, col: 2 },
      { playerIdx: 0, col: 2 },
      { playerIdx: 1, col: 3 },
      { playerIdx: 1, col: 3 },
      { playerIdx: 0, col: 3 },
      { playerIdx: 1, col: 4 },
      { playerIdx: 0, col: 4 },
      { playerIdx: 0, col: 5 },
    ])
  );

  it(
    'can detect N cells connected in forward diagonal',
    testConnectedCells(4, [
      { playerIdx: 0, col: 2 },
      { playerIdx: 1, col: 3 },
      { playerIdx: 0, col: 3 },
      { playerIdx: 1, col: 4 },
      { playerIdx: 1, col: 4 },
      { playerIdx: 0, col: 4 },
      { playerIdx: 1, col: 5 },
      { playerIdx: 1, col: 5 },
      { playerIdx: 1, col: 5 },
      { playerIdx: 0, col: 5 },
    ])
  );
});
