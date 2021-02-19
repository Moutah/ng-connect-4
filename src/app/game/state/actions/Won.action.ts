import { Player } from 'src/app/shared/player';

export class Won {
  static readonly type = '[Game] Game won';
  constructor(public winner: Player) {}
}
