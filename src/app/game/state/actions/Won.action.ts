import { Player } from '../../player';

export class Won {
  static readonly type = '[Game] Game won';
  constructor(public winner: Player) {}
}
