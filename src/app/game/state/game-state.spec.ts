import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { Player } from '../player';
import { GameState } from '.';
import * as Game from './actions';

describe('GameState', () => {
  let store: Store;
  let players: Player[];

  // snapshot select helpers
  const getActivePlayer = () => store.selectSnapshot(GameState.activePlayer);
  const getPlayers = () => store.selectSnapshot((state) => state.game.players);
  const getFirstPlayer = () => store.selectSnapshot(GameState.firstPlayer);
  const getWinner = () => store.selectSnapshot(GameState.winner);
  const getStartTimestamp = () =>
    store.selectSnapshot((state) => state.game.startTimestamp);
  const getIsGameOver = () => store.selectSnapshot(GameState.isOver);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([GameState])],
    });

    store = TestBed.inject(Store);
    players = [new Player('p1', 'Batman'), new Player('p2', 'Superman')];
  });

  it('can set players', () => {
    store.dispatch(new Game.SetPlayers(players[0], players[1]));

    expect(getPlayers()).toEqual([players[0], players[1]]);
  });

  it('can set starting player', () => {
    store.dispatch(new Game.SetFirstPlayer(players[1]));

    expect(getFirstPlayer()).toEqual(players[1]);
  });

  it('can start the game', () => {
    // init
    store.dispatch(new Game.SetPlayers(players[0], players[1]));
    store.dispatch(new Game.SetFirstPlayer(players[0]));

    // validate initial state
    expect(getStartTimestamp()).toBeFalsy();
    expect(getIsGameOver()).toBe(true);

    // start the game
    store.dispatch(new Game.Start());

    // game is started
    expect(getStartTimestamp()).toBeTruthy();
    expect(getIsGameOver()).toBe(false);
    expect(getActivePlayer()).toEqual(players[0]);
  });

  it('can set game as won', () => {
    store.dispatch(new Game.Won(players[0]));

    expect(getWinner()).toEqual(players[0]);
  });

  it('stops the game when setting a winner', () => {
    // start the game
    store.dispatch(new Game.Start());

    // set winner
    store.dispatch(new Game.Won(players[0]));

    // game is over
    const isGameOver = getIsGameOver();
    expect(isGameOver).toBe(true);
  });

  it('can stop the game', () => {
    store.dispatch(new Game.End());

    const isGameOver = getIsGameOver();
    expect(isGameOver).toBe(true);
  });

  it('can clear the game state', () => {
    // simulate full game
    store.dispatch(new Game.SetPlayers(players[0], players[1]));
    store.dispatch(new Game.SetFirstPlayer(players[0]));
    store.dispatch(new Game.Start());
    store.dispatch(new Game.Won(players[1]));

    // validate initial state
    expect(getPlayers()).toEqual([players[0], players[1]]);
    expect(getStartTimestamp()).toBeTruthy();
    expect(getWinner()).toEqual(players[1]);

    // clear
    store.dispatch(new Game.Clear());
    expect(getPlayers()).toEqual([]);
    expect(getStartTimestamp()).toBeFalsy();
    expect(getIsGameOver()).toBe(true);
    expect(getWinner()).toBeFalsy();
  });

  it('can switch palyers turn', () => {
    // init
    store.dispatch(new Game.SetPlayers(players[0], players[1]));
    store.dispatch(new Game.SetFirstPlayer(players[0]));
    store.dispatch(new Game.Start());

    // player 2's turn
    store.dispatch(new Game.NextPlayer());
    expect(getActivePlayer()).toEqual(players[1]);

    // back to player 1
    store.dispatch(new Game.NextPlayer());
    expect(getActivePlayer()).toEqual(players[0]);
  });
});
