import { ResourceEnum, ResourceRepo } from './resource.enum';
import { ResourceService } from './resource.service';
import { PlayerError } from '../../player/player.error';
import { Player } from 'logic/player/player';
import { PlayerService } from 'logic/player/player.service';

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
      PlayerError.PLAYER_INCORRECT(player);
    }
    const price = this.getPrice(resourceName, quantity);
    if (player.cash < price) {
      throw PlayerError.CASH_NO_ENOUGH(price, player.cash);
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

  getCurrentPlayer() {
    if (this.playersAbleToBuy.length < 1) {
      throw ;
    }
    return this.playersAbleToBuy[0];
  }

  getResourcesToBuy() {
    // return ResourceService.getCurrentResources();
  }


  isStageFinished() {
    // return (this.playersAbleToBuy || []).length === 0;
  }
}
