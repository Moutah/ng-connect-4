import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { End, NextPlayer, Start } from './actions';

export interface GameStateModel {
  activePlayer: 1 | 2;
  isOver: boolean;
}

@State<GameStateModel>({
  name: 'game',
  defaults: {
    activePlayer: 1,
    isOver: true,
  },
})
@Injectable()
export class GameState {
  /**
   * Get the currently active player.
   */
  @Selector()
  static activePlayerCode(state: GameStateModel): 'P1' | 'P2' {
    return state.activePlayer === 1 ? 'P1' : 'P2';
  }

  /**
   * Get the currently active player.
   */
  @Selector()
  static isStarted(state: GameStateModel): boolean {
    return !state.isOver;
  }

  /**
   * Marks the game as _not_ over.
   */
  @Action(Start)
  startGame(ctx: StateContext<GameStateModel>): void {
    ctx.patchState({ isOver: false });
  }

  /**
   * Marks the game as over.
   */
  @Action(End)
  endGame(ctx: StateContext<GameStateModel>): void {
    ctx.patchState({ isOver: true });
  }

  /**
   * Marks the game as over.
   */
  @Action(NextPlayer)
  startNextPlayersTurn(ctx: StateContext<GameStateModel>): void {
    const state = ctx.getState();
    ctx.patchState({ activePlayer: state.activePlayer === 2 ? 1 : 2 });
  }
}
