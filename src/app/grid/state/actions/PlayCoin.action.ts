export class PlayCoin {
  static readonly type = '[Grid] Play coin';
  constructor(public ownerId: string, public col: number) {}
}
