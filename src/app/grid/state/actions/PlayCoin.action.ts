export class PlayCoin {
  static readonly type = '[Grid] Play coin';
  constructor(public player: 'P1' | 'P2', public col: number) {}
}
