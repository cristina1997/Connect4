import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponentComponent } from './game-component/game-component.component';
import { MenuComponentComponent } from './menu-component/menu-component.component';

const routes: Routes = [
  { path: `game`, component: GameComponentComponent },
  { path: `menu`, component: MenuComponentComponent },
  { path: '', pathMatch: 'full', redirectTo: `menu`}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
