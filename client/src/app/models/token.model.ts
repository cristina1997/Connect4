import { GameState } from "../enums/game-state";
import { HiddenToken } from "../enums/hidden-token";

export class Token {

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
    this.colour = '';
    this.gameState = GameState.START;
    this.hiddenToken = HiddenToken.FALSE;
  }

  public row: number;
  public column: number;
  public colour: string;
  public gameState: string;
  public hiddenToken: string;
}
