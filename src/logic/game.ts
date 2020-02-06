import { Player } from './player/player';
import { Stage } from './stages/stage';

export class Game {
  players: Player[] = [];
  stages: Stage[] = [];

  constructor(players: Player[], stages: Stage[]) {
    this.players = players;
    this.stages = stages;
  }

  start(): void {
    this.stages.forEach(stage => {
      stage.doAction(this.players);
    });
  }
}
