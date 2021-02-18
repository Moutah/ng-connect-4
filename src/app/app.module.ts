import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { GridComponent } from './grid/grid.component';
import { CellComponent } from './grid/cell/cell.component';
import { TimerComponent } from './game/timer/timer.component';
import { GameState } from './game/state';
import { FormsModule } from '@angular/forms';
import { GridState } from './grid/state';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GridComponent,
    CellComponent,
    TimerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    NgxsModule.forRoot([GameState, GridState]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
