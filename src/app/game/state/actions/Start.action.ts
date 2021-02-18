import { Player } from 'src/app/shared/player';

export class Start {
  static readonly type = '[Game] Start the game';
  constructor(public startingPlayer: Player) {}
}
