import { Player } from 'src/app/shared/models/player';

export class SetPlayers {
  static readonly type = '[Game] Set player';
  constructor(public player1: Player, public player2: Player) {}
}
