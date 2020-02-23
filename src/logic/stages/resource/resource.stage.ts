import { ResourceEnum, ResourceRepo } from './resource.enum';
import { ResourceService } from './resource.service';
import { Player } from '../../player/player';
import { Stage } from '../stage';

export class ResourceStage extends Stage {
  resourceRepo: ResourceRepo;
  stagePlayers: Player[];

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

  setStagePlayers(): void {
    this.stagePlayers = this.stagePlayers.filter(player => {
      const resources = (player.stations || []).map(
        station => station.resource
      );
      return resources.some(res => ResourceService.getPrice(res, 1) < player.cash);
    });
  }
}
