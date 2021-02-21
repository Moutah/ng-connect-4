import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './pages/home/home.component';
import { RulesComponent } from './pages/rules/rules.component';

const routes: Routes = [
  { path: 'how-to-play', component: RulesComponent },
  { path: 'game', component: GameComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
