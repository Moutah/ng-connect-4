import { Player } from '../../player';

export class SetFirstPlayer {
  static readonly type = '[Game] Set first player';
  constructor(public player: Player) {}
}
