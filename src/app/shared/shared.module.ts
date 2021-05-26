import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatGridListModule
  ],
  exports: [
    RouterModule,
    NavBarComponent,
    MatGridListModule
  ]
})
export class SharedModule { }
