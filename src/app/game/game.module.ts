import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { TimerComponent } from './timer/timer.component';
import { PlayerSetupComponent } from './player-setup/player-setup.component';
import { NgxsModule } from '@ngxs/store';
import { GameState } from './state';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { GridModule } from '../grid/grid.module';

@NgModule({
  declarations: [GameComponent, TimerComponent, PlayerSetupComponent],
  imports: [
    CommonModule,
    GridModule,
    FormsModule,
    MaterialModule,
    NgxsModule.forFeature([GameState]),
  ],
})
export class GameModule {}
