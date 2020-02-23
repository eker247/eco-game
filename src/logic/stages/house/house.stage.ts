import { Player, PlayerService } from '../../player';
import { SettingService } from '../../setting.service';

export class HouseStage {
  playersAbleToBuy: Player[];

  constructor() {
    this.playersAbleToBuy = PlayerService.getPlayersAscending();
    this.setPlayersAbleToBuy();
  }

  setPlayersAbleToBuy(): void {
    this.playersAbleToBuy = this.playersAbleToBuy.filter(
      player =>
        player.cash >=
        SettingService.HOUSE_BASIC_PRICE +
          (SettingService.LEVEL - 1) * SettingService.HOUSE_EXTRA_PRICE
    );
  }

  getCurrentPlayer(): Player {
    if ((this.playersAbleToBuy || []).length < 1) {
      throw new Error('HouseSt.getCurrentPlayer - There is no player');
    }
    return this.playersAbleToBuy[0];
  }

  removeCurrentPlayer(): void {
    if ((this.playersAbleToBuy || []).length < 1) {
      throw new Error('HouseSt.removeCurrentPlayer - There is no player');
    }
    this.playersAbleToBuy = this.playersAbleToBuy.slice(1);
  }

  isStageFinished(): boolean {
    return !(this.playersAbleToBuy || []).length;
  }
}
