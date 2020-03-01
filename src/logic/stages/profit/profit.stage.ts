import { Player } from '../../player';
import { SettingService } from '../../setting.service';
import { Stage } from '../stage';
import { Station } from '../station';

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

  makeProfit(stations: Station[]): number {
    const player = this.getCurrentPlayer();
    const profit = this.computeProfit(stations);
    player.cash += profit;
    stations.forEach(station => {
      player.resources[station.resource] -= station.resourceConsumption;
    });
    return profit;
  }

  computeProfit(stations: Station[]): number {
    const player = this.getCurrentPlayer();
    let houseForProfit = 0;
    stations.forEach(station => {
      if (
        ((player.resources || {})[station.resource] || 0) <
        station.resourceConsumption
      ) {
        throw new Error(
          `ProfitSt.makeProfit - Player has no enough ${station.resource}`
        );
      }
      houseForProfit += station.efficiency;
    });
    let effectiveHouses =
      houseForProfit < player.houses.length
        ? houseForProfit
        : player.houses.length;
    const profit =
      SettingService.PROFIT_BASE +
      effectiveHouses * SettingService.PROFIT_EXTRA;
    return profit;
  }
}
