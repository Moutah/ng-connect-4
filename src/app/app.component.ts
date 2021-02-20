import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isHome$: Observable<boolean>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isHome$ = this.router.events
      .pipe(
        filter((e: RouterEvent): e is RouterEvent => e instanceof RouterEvent)
      )
      .pipe(map((e) => e.url === '/'));
  }
}
