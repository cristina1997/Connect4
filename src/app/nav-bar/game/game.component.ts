import { Component, OnInit } from '@angular/core';
import { BoardSize } from 'src/app/enums/board-size';
import { GameTile } from 'src/app/game-tile';

@Component({
  selector: 'app-game-component',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  readonly columns = BoardSize.COLUMN;
  readonly rows = BoardSize.ROW;

  tiles: GameTile[] = [
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
    {cols: 1, rows: 1, shape: 'circle', height: '50px', width: "50px"},
  ];

  constructor() { }

  ngOnInit(): void {

  }

}
