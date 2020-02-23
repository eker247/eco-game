import { Player } from '../../player';
import { SettingService } from '../../setting.service';
import { Stage } from '../stage';

export class HouseStage extends Stage {
  stagePlayers: Player[];

  setStagePlayers(): void {
    this.stagePlayers = this.stagePlayers.filter(
      player =>
        player.cash >=
        SettingService.HOUSE_BASIC_PRICE +
          (SettingService.LEVEL - 1) * SettingService.HOUSE_EXTRA_PRICE
    );
  }
}
