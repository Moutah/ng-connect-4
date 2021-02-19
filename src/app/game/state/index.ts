import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Player } from 'src/app/shared/player';
import {
  End,
  NextPlayer,
  Start,
  SetPlayers,
  Clear,
  Won,
  SetFirstPlayer,
} from './actions';

export interface GameStateModel {
  players: Player[];
  firstPlayer?: Player;
  activePlayer?: Player;
  winner?: Player;
  startTimestamp?: number;
  isOver: boolean;
}

@State<GameStateModel>({
  name: 'game',
  defaults: {
    players: [],
    firstPlayer: undefined,
    activePlayer: undefined,
    winner: undefined,
    startTimestamp: undefined,
    isOver: true,
  },
})
@Injectable()
export class GameState {
  /**
   * Returns `true` if the game has a start time.
   */
  @Selector()
  static isStarted(state: GameStateModel): boolean {
    return !!state.startTimestamp;
  }

  /**
   * Returns `true` if the game is over.
   */
  @Selector()
  static isOver(state: GameStateModel): boolean {
    return state.isOver;
  }

  /**
   * Get the currently active player.
   */
  @Selector()
  static firstPlayer(state: GameStateModel): Player {
    return state.firstPlayer;
  }

  /**
   * Get the currently active player.
   */
  @Selector()
  static activePlayer(state: GameStateModel): Player {
    return state.activePlayer;
  }

  /**
   * Get the winner player.
   */
  @Selector()
  static winner(state: GameStateModel): Player {
    return state.winner;
  }

  /**
   * Set the players.
   */
  @Action(SetPlayers)
  setPlayers(ctx: StateContext<GameStateModel>, action: SetPlayers): void {
    ctx.patchState({
      players: [action.player1, action.player2],
    });
  }

  /**
   * Set the players.
   */
  @Action(SetFirstPlayer)
  setFirstPlayer(
    ctx: StateContext<GameStateModel>,
    action: SetFirstPlayer
  ): void {
    ctx.patchState({ firstPlayer: action.player });
  }

  /**
   * Starts the game by setting the start timestamp and initializing
   * activePlayer.
   */
  @Action(Start)
  startGame(ctx: StateContext<GameStateModel>): void {
    const state = ctx.getState();
    ctx.patchState({
      isOver: false,
      startTimestamp: new Date().getTime(),
      activePlayer: state.firstPlayer,
    });
  }

  /**
   * Sets the winner of the game.
   */
  @Action(Won)
  setWinner(ctx: StateContext<GameStateModel>, action: Won): void {
    ctx.patchState({ winner: action.winner });
  }

  /**
   * Marks the game as over.
   */
  @Action(End)
  @Action(Won)
  endGame(ctx: StateContext<GameStateModel>): void {
    ctx.patchState({ isOver: true });
  }

  /**
   * Resets state.
   */
  @Action(Clear)
  clearGame(ctx: StateContext<GameStateModel>): void {
    ctx.patchState({
      players: [],
      firstPlayer: undefined,
      winner: undefined,
      isOver: true,
      startTimestamp: undefined,
    });
  }

  /**
   * Switch the active player.
   */
  @Action(NextPlayer)
  startNextPlayersTurn(ctx: StateContext<GameStateModel>): void {
    const state = ctx.getState();
    const innactivePlayer = state.players.find(
      (player) => player !== state.activePlayer
    );
    ctx.patchState({ activePlayer: innactivePlayer });
  }
}
