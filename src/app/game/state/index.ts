import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Player } from 'src/app/shared/models/player';
import { End, NextPlayer, Start, SetPlayers } from './actions';

export interface GameStateModel {
  players: Player[];
  activePlayer?: Player;
  isOver: boolean;
}

@State<GameStateModel>({
  name: 'game',
  defaults: {
    players: [],
    activePlayer: undefined,
    isOver: true,
  },
})
@Injectable()
export class GameState {
  /**
   * Get the currently active player.
   */
  @Selector()
  static activePlayer(state: GameStateModel): Player {
    return state.activePlayer;
  }

  /**
   * Get the currently active player.
   */
  @Selector()
  static isStarted(state: GameStateModel): boolean {
    return !state.isOver;
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
   * Marks the game as _not_ over.
   */
  @Action(Start)
  startGame(ctx: StateContext<GameStateModel>, action: Start): void {
    ctx.patchState({
      isOver: false,
      activePlayer: action.startingPlayer,
    });
  }

  /**
   * Marks the game as over.
   */
  @Action(End)
  endGame(ctx: StateContext<GameStateModel>): void {
    ctx.patchState({ isOver: true });
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
