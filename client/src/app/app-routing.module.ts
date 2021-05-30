import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full',
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./components/menu/menu.module').then((module) => module.MenuModule),
  },
  {
    path: 'game',
    loadChildren: () =>
      import('./components/game/game.module').then((module) => module.GameModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
