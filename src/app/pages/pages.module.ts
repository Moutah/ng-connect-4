import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { RulesComponent } from './rules/rules.component';

@NgModule({
  declarations: [HomeComponent, RulesComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
})
export class PagesModule {}
