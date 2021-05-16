import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: `game`, component: GameComponent },
  { path: `menu`, component: MenuComponent },
  { path: `home`, component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: `home`}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
