import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { CellComponent } from './cell/cell.component';
import { NgxsModule } from '@ngxs/store';
import { GridState } from './state';
import { MaterialModule } from '../material.module';
import { CoinComponent } from './coin/coin.component';

@NgModule({
  declarations: [GridComponent, CellComponent, CoinComponent],
  imports: [CommonModule, MaterialModule, NgxsModule.forFeature([GridState])],
  exports: [GridComponent, CoinComponent],
})
export class GridModule {}
