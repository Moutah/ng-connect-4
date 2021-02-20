import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss'],
})
export class CoinComponent {
  @Input() color: string;

  constructor() {}

  /**
   * Returns the css class for coin color.
   */
  coinColor(): string {
    return this.color ? `coin--${this.color}` : '';
  }
}
