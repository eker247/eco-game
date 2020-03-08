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

  removePlayer(player: Player = this.stagePlayers[0]): void {
    if (!this.stagePlayers.length) {
      throw new Error('Stage.removePlayer - There is no player');
    } else if (!this.stagePlayers.some(old => old.id === player.id)) {
      throw 'Stage.removePlayer - No such a player';
    }
    this.stagePlayers = this.stagePlayers.filter(old => old.id !== player.id);
  }

  isStageFinished(): boolean {
    return !(this.stagePlayers || []).length;
  }
}
