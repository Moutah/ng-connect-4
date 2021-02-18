import { Player } from 'src/app/shared/models/player';

export class Start {
  static readonly type = '[Game] Start the game';
  constructor(public startingPlayer: Player) {}
}
