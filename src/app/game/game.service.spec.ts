import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';
import { NgxsModule, Store } from '@ngxs/store';
import { GameState } from './state';
import { GridState } from '../grid/state';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { Observable, zip } from 'rxjs';
import * as Grid from '../grid/state/actions';
import * as Game from './state/actions';
import { environment } from 'src/environments/environment';
import { Player } from '../shared/player';

describe('GameService', () => {
  let service: GameService;
  let store: Store;
  let players: Player[];
  let actions$: Observable<any>;

  // /**
  //  * Get the active player from the game state.
  //  */
  // const getActivePlayer = () =>
  //   store.selectSnapshot((state) => state.game.activePlayer);

  // /**
  //  * Get the grid columms from the grid state.
  //  */
  // const getGridCols = () => store.selectSnapshot((state) => state.grid.cols);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([GameState, GridState])],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(GameService);
    actions$ = TestBed.inject(Actions);
    players = [new Player('p1', 'Batman'), new Player('p2', 'Superman')];
    service.setup(players[0], players[1]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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

    service.start();
  });

  it('can clear the game', (done) => {
    // define expected actions
    zip(actions$.pipe(ofActionDispatched(Game.Clear))).subscribe(
      (dispatchedActions) => {
        expect(dispatchedActions.length).toBe(1);
        done();
      }
    );

    service.clear();
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

    service.start();
    service.play(2);
  });

  it('cannnot play a coin if game has not started', () => {
    expect(() => service.play(2)).toThrowError(
      '[Game Service] The game has not started, play() is not allowed.'
    );
  });

  it('cannnot play a coin if column is full', () => {
    // start the game and fill column 2
    service.start();
    for (let i = 0; i < environment.gridRows; i++) {
      service.play(2);
    }

    // column 2 is full, no coin is played
    const storeDispatchSpy = spyOn(store, 'dispatch');
    service.play(2);
    expect(storeDispatchSpy).not.toHaveBeenCalled();
  });
});
