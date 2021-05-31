import { Component, OnInit } from '@angular/core';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { BoardSize } from 'src/app/enums/board-size';
import { GameState } from 'src/app/enums/game-state';
import { TokenColours } from 'src/app/enums/token-colours';
import { Token } from 'src/app/models/token.model';
import { HiddenToken } from 'src/app/enums/hidden-token';
import { MatDialog } from '@angular/material/dialog';
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

  // Token colour
  nextColour: string = '';

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.displayToken();
    this.displayGrid();
  }

/*
  * Moves the token
  *
  */
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
        this.delay(500);
      }

      const isWon = this.calculateConnectFive(row, column, 0, token.colour, 'all');
      if (isWon) {
        setTimeout(() => { this.openDialog(token.colour)}, 500);
      }

    }
  }

/*
  * Opens the win dialog and creates a new grid when closed
  *
  */
  openDialog(colour: string) {
    const dialogRef = this.dialog.open(WinnerDialogComponent, {
      data: {
        colour: colour
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.displayToken();
      this.displayGrid();
    });
  }

  /*
    * Checks if the player gathered 5 tokens in a line
    *
    */
  calculateConnectFive(row: number, column: number, count: number, color: string, caseConnect: string): boolean {
    if (count === 5) {
      return true;
    } else if (this.token[row] === undefined || this.token[row][column] === undefined || this.token[row][column].colour === undefined) {
      return false;
    } else if (color !== this.token[row][column].colour) {
      return false;
    } else {
      switch (caseConnect) {
        case WinningLine.EAST:
          return this.calculateConnectFive(row + 1, column, count + 1, color, WinningLine.EAST);
        case WinningLine.WEST:
          return this.calculateConnectFive(row - 1, column, count + 1, color, WinningLine.WEST);
        case WinningLine.NORTH:
          return this.calculateConnectFive(row, column + 1, count + 1, color, WinningLine.NORTH);
        case WinningLine.SOUTH:
          return this.calculateConnectFive(row, column - 1, count + 1, color, WinningLine.SOUTH);
        case WinningLine.NORTHEAST:
          return this.calculateConnectFive(row + 1, column + 1, count + 1, color, WinningLine.NORTHEAST);
        case WinningLine.NORTHWEST:
          return this.calculateConnectFive(row - 1, column + 1, count + 1, color, WinningLine.NORTHWEST);
        case WinningLine.SOUTHEAST:
          return this.calculateConnectFive(row + 1, column - 1, count + 1, color, WinningLine.SOUTHEAST);
        case WinningLine.SOUTHWEST:
          return this.calculateConnectFive(row - 1, column - 1, count + 1, color, WinningLine.SOUTHWEST);
        case 'all':
          return this.calculateConnectFive(row + 1, column, count + 1, color, WinningLine.EAST) ||
            this.calculateConnectFive(row - 1, column, count + 1, color, WinningLine.WEST) ||
            this.calculateConnectFive(row, column + 1, count + 1, color, WinningLine.NORTH) ||
            this.calculateConnectFive(row, column - 1, count + 1, color, WinningLine.SOUTH) ||
            this.calculateConnectFive(row + 1, column + 1, count + 1, color, WinningLine.NORTHEAST) ||
            this.calculateConnectFive(row - 1, column + 1, count + 1, color, WinningLine.NORTHWEST) ||
            this.calculateConnectFive(row + 1, column - 1, count + 1, color, WinningLine.SOUTHEAST) ||
            this.calculateConnectFive(row - 1, column - 1, count + 1, color, WinningLine.SOUTHWEST);
        default:
          return false;
      }
    }
  }

/*
  * Delays next player's turn by 100 milliseconds
  *
  */
  private delay(ms: number): Promise<any> {
    return new Promise(() => setTimeout(() => this.isClickable = true, ms));
  }

/*
  * Display token
  *
  */
  displayToken() {
    this.count = 1;
    this.isClickable = true;
    this.nextColour = TokenColours.PLAYER1;
  }

/*
  * Display game grid
  *
  */
  displayGrid() {
    this.gridTiles = [];
    this.gridTileItems = [];

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
        this.gridTiles.push(`${i} ${j}`);
      }
    }
  }

}
