import { Player } from '../../player';
import { Stage } from '../stage';

export class ProfitStage extends Stage {
  stagePlayers: Player[];

  setStagePlayers(): void {
    this.stagePlayers = this.stagePlayers.filter(player =>
      (player.stations || []).some(
        station =>
          ((player.resources || {})[station.resource] || 0) >=
          station.resourceConsumption
      )
    );
  }
}
