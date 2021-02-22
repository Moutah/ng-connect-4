import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgxsModule, Store, Actions, ofActionDispatched } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GridState } from 'src/app/grid/state';
import { Player } from '../player';
import { GameState } from '../state';
import * as Grid from '../../grid/state/actions';
import * as Game from '../state/actions';
import { AiService } from './ai.service';
import { GameService } from './game.service';

describe('AiService', () => {
  let ai: AiService;
  let game: GameService;
  let store: Store;
  let players: Player[];
  let actions$: Observable<any>;

  /**
   * Set the grid by playing the given `moves`
   */
  const setGrid = (moves: { playerIdx: number; col: number }[]) => {
    // start game
    store.dispatch(new Game.SetFirstPlayer(players[0]));
    game.start();

    // play moves
    moves.forEach((play) =>
      store.dispatch(new Grid.PlayCoin(players[play.playerIdx].color, play.col))
    );
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([GameState, GridState])],
    });

    ai = TestBed.inject(AiService);
    store = TestBed.inject(Store);
    game = TestBed.inject(GameService);
    actions$ = TestBed.inject(Actions);

    // setup game
    players = [new Player('p1', 'Batman'), new Player('p2', 'Superman')];
    game.setup(players[0], players[1]);
  });

  it('should be created', () => {
    expect(ai).toBeTruthy();
  });

  it('only wakes up once', () => {
    const aiStopSpy = spyOn(ai, 'stop');
    expect(ai.isAwake()).toBe(false);

    // awake multiple times
    ai.awake();
    ai.awake();
    ai.awake();
    expect(ai.isAwake()).toBe(true);

    store.dispatch(new Game.End());
    expect(aiStopSpy).toHaveBeenCalledTimes(1);
  });

  it('starts automatically when game starts', () => {
    const aiStartSpy = spyOn(ai, 'start');

    ai.awake();

    // start on game end
    store.dispatch(new Game.Start());
    expect(aiStartSpy).toHaveBeenCalled();
  });

  it('stops automatically when game ends', () => {
    const aiStopSpy = spyOn(ai, 'stop');

    ai.awake();

    // stop on game end
    store.dispatch(new Game.End());
    expect(aiStopSpy).toHaveBeenCalled();
  });

  it('plays when it is its turn', fakeAsync(() => {
    const gamePlaySpy = spyOn(game, 'play');

    const aiPlayer = new Player('p?', 'Joker', true);
    game.setup(players[0], aiPlayer);

    // starts game with IA as first player
    ai.awake();
    store.dispatch(new Game.SetFirstPlayer(aiPlayer));
    game.start();

    tick(1000);
    expect(gamePlaySpy).toHaveBeenCalled();
  }));

  it('never plays if no AI player', fakeAsync(() => {
    const aiPlaySpy = spyOn(ai, 'play');

    // starts game with IA as first player
    ai.awake();
    game.start();

    // maybe ai is first player
    tick(1000);

    // play for first player
    game.play(2);

    // maybe ai is second player
    tick(1000);

    expect(aiPlaySpy).not.toHaveBeenCalled();
  }));

  it('can detect a valid random move', () => {
    // set grid with first column filled
    setGrid([
      { playerIdx: 0, col: 0 },
      { playerIdx: 0, col: 0 },
      { playerIdx: 0, col: 0 },
      { playerIdx: 0, col: 0 },
      { playerIdx: 0, col: 0 },
      { playerIdx: 0, col: 0 },
    ]);

    expect(ai.getRandomMove()).not.toBe(0);
  });

  it('can detect a winning move', () => {
    // set grid with a winning move for ai
    setGrid([
      { playerIdx: 0, col: 6 },
      { playerIdx: 0, col: 6 },
      { playerIdx: 0, col: 6 },
    ]);

    expect(ai.getSmartMove()).toBe(6);
  });

  it('can detect a defensive move', () => {
    // set grid with a winning move for opponent
    setGrid([
      { playerIdx: 1, col: 0 },
      { playerIdx: 1, col: 0 },
      { playerIdx: 1, col: 0 },
    ]);

    expect(ai.getSmartMove()).toBe(0);
  });

  it('plays winning move regardless of other possibilites', () => {
    // set grid with a winning move for ai
    setGrid([
      { playerIdx: 0, col: 1 },
      { playerIdx: 0, col: 1 },
      { playerIdx: 0, col: 1 },
      { playerIdx: 1, col: 2 },
      { playerIdx: 1, col: 2 },
      { playerIdx: 1, col: 2 },
    ]);

    expect(ai.getSmartMove()).toBe(1);
  });

  it('plays randomly if no smart move available', () => {
    const playRandomSpy = spyOn(ai, 'getRandomMove');

    // set grid with a winning move for ai
    setGrid([{ playerIdx: 0, col: 1 }]);

    ai.getSmartMove();
    expect(playRandomSpy).toHaveBeenCalled();
  });
});
