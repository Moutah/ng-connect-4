import { Player } from 'src/app/shared/player';

export class PlayCoin {
  static readonly type = '[Grid] Play coin';
  constructor(public player: Player, public col: number) {}
}
