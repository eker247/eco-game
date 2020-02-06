import { Player } from "../player/player";

export interface Stage {
  doAction(players: Player[]): any;
}