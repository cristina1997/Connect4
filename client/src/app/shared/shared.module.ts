import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogActions, MatDialogContainer, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

// Components
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { GridComponent } from '../components/grid/grid.component';
import { WinnerDialogComponent } from '../components/winner-dialog/winner-dialog.component';

@NgModule({
  declarations: [NavBarComponent, GridComponent, WinnerDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [
    RouterModule,
    NavBarComponent,
    GridComponent,
    WinnerDialogComponent,
    MatButtonModule,
    MatDialogModule,
  ]
})
export class SharedModule { }
