import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() isRunning: boolean;
  elapsedSeconds: number;
  private tickerInverval: number;

  constructor() {}

  /**
   * Initialize elapsed time and starts the ticker interval.
   */
  ngOnInit(): void {
    this.elapsedSeconds = 0;
    this.tickerInverval = window.setInterval(() => {
      if (this.isRunning) {
        this.elapsedSeconds++;
      }
    }, 1000);
  }

  /**
   * Clears the ticker interval.
   */
  ngOnDestroy(): void {
    window.clearInterval(this.tickerInverval);
  }

  /**
   * Returns the minutes part of `this.elapsedSeconds`.
   */
  getFormattedElapsedMinutes(): string {
    return Math.floor(this.elapsedSeconds / 60).toString();
  }

  /**
   * Returns the seconds part of `this.elapsedSeconds`. Returns the value as a
   * 2 digits string. Eg: `"01"`, `"07"`, `"22"`
   */
  getFormattedElapsedSeconds(): string {
    return (this.elapsedSeconds % 60).toString().padStart(2, '0');
  }
}
