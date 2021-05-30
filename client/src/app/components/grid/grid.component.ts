import { Component, OnInit } from '@angular/core';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { BoardSize } from 'src/app/enums/board-size';
import { GameState } from 'src/app/enums/game-state';
import { TokenColours } from 'src/app/enums/token-colours';
import { Token } from 'src/app/models/token.model';
import { HiddenToken } from 'src/app/enums/hidden-token';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WinnerDialogComponent } from 'src/app/components/winner-dialog/winner-dialog.component';
import { WinningLine } from 'src/app/enums/winning-line';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  animations: [
  trigger('movetoken', [
    state('start', style({
      'background-color': '{{bg-color}}',
      transform: 'translate(0, 0)'
    }), { params: { 'bg-color': 'PLAYER1' } }),
    state('end', style({
      'background-color': '{{bg-color}}',
      visibility: 'unset',
      transform: 'translate(0, {{yPosition}}px)'
    }), { params: { yPosition: 0, 'bg-color': 'PLAYER1' } }),
    transition('* => end', [
      animate('1s', keyframes([
        style({ 'background-color': '{{bg-color}}', offset: 0 }),
        style({ visibility: 'unset', offset: 0 }),
        style({ transform: 'translateY(0)', offset: 0 }),
        style({ transform: 'translateY({{yPosition}}px)', offset: 0.6 }),
        style({ transform: 'translateY({{bounceUp}}px)', offset: 0.7 }),
        style({ transform: 'translateY({{yPosition}}px)', offset: 0.8 }),
        style({ transform: 'translateY({{bounceDown}}px)', offset: 0.9 }),
        style({ transform: 'translateY({{yPosition}}px)', offset: 1 })
      ]))], { params: { yPosition: 0, bounceUp: 0, bounceDown: 0, 'bg-color': 'PLAYER1' } })

  ]),
  trigger('hideContainer', [
    state('false', style({ 'z-index': 2 })),
    state('true', style({ 'z-index': 1 })),
    transition('false => remove', [animate('0.5s')])
  ])]
})
export class GridComponent implements OnInit {

  // Token
  count = 0;
  bounceUp = 0;
  bounceDown = 0;
  token: Token[][] = [];
  isClickable: boolean = true;
  tokenState: string = '';

  //  Grid
  gridTiles: string[] = [];
  gridTileItems: number[][] = [];

  // token colour
  nextColour: string = '';

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.createGrid();
  }

  tokenMovement(row: number, column: number): void {
    const token = this.token[row][column];

    if (this.isClickable) {
      this.isClickable = false;

      if (token.gameState !== GameState.END)
      {
        token.hiddenToken = HiddenToken.TRUE;

        if (this.count % 2 === 0) {
          token.colour = TokenColours.PLAYER2;
          this.nextColour =  TokenColours.PLAYER1;
        } else {
          token.colour = TokenColours.PLAYER1;
          this.nextColour = TokenColours.PLAYER2;
        }
        token.column = (90 * (row+3));
        this.bounceUp = token.column - 40;
        this.bounceDown = token.column - 10;
        token.gameState = GameState.END;
        this.count++;
      }
      if (this.checkFourConnect(row, column, 0, token.colour)) {
        this.openDialog(token.colour);
      }
      this.delay(100);
    }
  }

  openDialog(colour: string) {
    const dialogRef = this.dialog.open(WinnerDialogComponent, {
      data: {
        colour: colour
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.createGrid();
    });
  }

  checkFourConnect(row: number, column: number, count: number, color: string, caseConnect = 'all'): boolean {
    if (count === 4) {
      return true;
    } else if (this.token[row] === undefined || this.token[row][column] === undefined || this.token[row][column].colour === undefined) {
      return false;
    } else if (color !== this.token[row][column].colour) {
      return false;
    } else {
      switch (caseConnect) {
        case WinningLine.EAST:
          return this.checkFourConnect(row + 1, column, count + 1, color, WinningLine.EAST);
        case WinningLine.WEST:
          return this.checkFourConnect(row - 1, column, count + 1, color, WinningLine.WEST);
        case WinningLine.NORTH:
          return this.checkFourConnect(row, column + 1, count + 1, color, WinningLine.NORTH);
        case WinningLine.SOUTH:
          return this.checkFourConnect(row, column - 1, count + 1, color, WinningLine.SOUTH);
        case WinningLine.NORTH + WinningLine.EAST:
          return this.checkFourConnect(row + 1, column + 1, count + 1, color, WinningLine.NORTH + WinningLine.EAST);
        case WinningLine.NORTH + WinningLine.WEST:
          return this.checkFourConnect(row - 1, column + 1, count + 1, color, WinningLine.NORTH + WinningLine.WEST);
        case WinningLine.SOUTH+ WinningLine.EAST:
          return this.checkFourConnect(row + 1, column - 1, count + 1, color, WinningLine.SOUTH+ WinningLine.EAST);
        case WinningLine.SOUTH+ WinningLine.WEST:
          return this.checkFourConnect(row - 1, column - 1, count + 1, color, WinningLine.SOUTH+ WinningLine.WEST);
        case 'all':
          return this.checkFourConnect(row + 1, column, count + 1, color, WinningLine.EAST) ||
            this.checkFourConnect(row - 1, column, count + 1, color, WinningLine.WEST) ||
            this.checkFourConnect(row, column + 1, count + 1, color, WinningLine.NORTH) ||
            this.checkFourConnect(row, column - 1, count + 1, color, WinningLine.SOUTH) ||
            this.checkFourConnect(row + 1, column + 1, count + 1, color, WinningLine.NORTH + WinningLine.EAST) ||
            this.checkFourConnect(row - 1, column + 1, count + 1, color, WinningLine.NORTH + WinningLine.WEST) ||
            this.checkFourConnect(row + 1, column - 1, count + 1, color, WinningLine.SOUTH+ WinningLine.EAST) ||
            this.checkFourConnect(row - 1, column - 1, count + 1, color, WinningLine.SOUTH+ WinningLine.WEST);
        default:
          return false;
      }
    }
  }

  private delay(ms: number): Promise<any> {
    return new Promise(resolve => setTimeout(() => this.isClickable = true, ms));
  }

  createGrid() {
    this.count = 1;
    this.isClickable = true;
    this.gridTiles = [];
    this.gridTileItems = [];
    this.nextColour = TokenColours.PLAYER1;

    for (let i = 0; i < BoardSize.ROW; i++) {
      this.gridTileItems[i] = [];
      for (let j = 0; j < BoardSize.COLUMN; j++) {
        this.gridTileItems[i][j] = j;
      }
    }

    for (let i = 0; i < BoardSize.COLUMN; i++) {
      this.token[i] = [];
      for (let j = 0; j < BoardSize.ROW; j++) {
        this.token[i][j] = new Token(0, 0);
        this.gridTiles.push(i + '/' + j);
      }
    }
  }

}
