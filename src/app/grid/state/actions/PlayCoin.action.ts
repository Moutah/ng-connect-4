import { Player } from 'src/app/shared/models/player';

export class PlayCoin {
  static readonly type = '[Grid] Play coin';
  constructor(public player: Player, public col: number) {}
}
