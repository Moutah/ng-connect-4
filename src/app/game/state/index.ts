import { Injectable } from '@angular/core';
import { Action, Select, Selector, State, StateContext } from '@ngxs/store';
import { End } from './actions/End.action';
import { NextPlayer } from './actions/NextPlayer.action';
import { Start } from './actions/Start.action';

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
