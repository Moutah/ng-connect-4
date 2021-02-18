export class PlayCoin {
  static readonly type = '[Grid] Play coin';
  constructor(public playerCode: 'P1' | 'P2', public col: number) {}
}
