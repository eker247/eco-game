import { Player } from "../player/player";
import { PlayerService } from '../player';

export abstract class Stage {
  stagePlayers: Player[];

  constructor() {
    this.stagePlayers = PlayerService.getPlayersAscending();
    this.setStagePlayers();
  }

  abstract setStagePlayers(): void;

  getCurrentPlayer(): Player {
    if (this.stagePlayers.length < 1) {
      throw new Error('Stage.getCurrentPlayer - Players not exist');
    }
    return this.stagePlayers[0];
  }

  removeCurrentPlayer(): void {
    if (!this.stagePlayers.length) {
      throw new Error('Stage.removeCurrentPlayer - There is no player');
    }
    this.stagePlayers = this.stagePlayers.slice(1);
  }

  isStageFinished(): boolean {
    return !(this.stagePlayers || []).length;
  }
}
