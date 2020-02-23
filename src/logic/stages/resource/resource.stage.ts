import { ResourceEnum, ResourceRepo } from './resource.enum';
import { ResourceService } from './resource.service';
import { Player } from '../../player/player';
import { PlayerService } from '../../player/player.service';

export class ResourceStage {
  resourceRepo: ResourceRepo;
  playersAbleToBuy: Player[];

  constructor() {
    this.playersAbleToBuy = PlayerService.getPlayersAscending();
    this.setPlayersAbleToBuy();
  }

  getPrice(resourceName: ResourceEnum, quantity: number): number {
    return ResourceService.getPrice(resourceName, quantity);
  }

  buyResource(
    player: Player,
    resourceName: ResourceEnum,
    quantity: number
  ): void {
    if (!player) {
      throw new Error('ResSt.buyResource - Player incorrect');
    }
    const price = this.getPrice(resourceName, quantity);
    if (player.cash < price) {
      throw new Error('ResSt.buyResource - No enough cash');
    }
    player.resources[resourceName]
      ? (player.resources[resourceName] += quantity)
      : (player.resources[resourceName] = quantity);
    ResourceService.getItems(resourceName, quantity);
    player.spend(price);
  }

  setPlayersAbleToBuy(): void {
    this.playersAbleToBuy = this.playersAbleToBuy.filter(player => {
      const resources = (player.stations || []).map(
        station => station.resource
      );
      return resources.some(res => ResourceService.getPrice(res, 1) < player.cash);
    });
  }

  getCurrentPlayer(): Player {
    if (this.playersAbleToBuy.length < 1) {
      throw new Error('ResSt.getCurrentPlayer - Players not exist');
    }
    return this.playersAbleToBuy[0];
  }

  removeCurrentPlayer(): void {
    if (!this.playersAbleToBuy.length) {
      throw new Error('ResSt.removeCurrentPlayer - There is no player');
    }
    this.playersAbleToBuy = this.playersAbleToBuy.slice(1);
  }

  isStageFinished(): boolean {
    return !(this.playersAbleToBuy || []).length;
  }
}
