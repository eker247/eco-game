import { Player } from '../../player/player';
import { Resource } from './resource';
import { ResourceRepo, ResourceEnum } from './resource.enum';
// import { ResourceService } from './resource.service';
import { ResourceError } from './resource.error';
import { ResourceService } from './resource.service';
import { PlayerError } from 'src/logic/player/player.error';

export class ResourceStage {
  resourceRepo: ResourceRepo;
  playersAbleToBuy: Player[];

  constructor(players: Player[] = []) {
    this.setPlayersAbleToBuy(players);
  }

  getPrice(resourceName: ResourceEnum, quantity: number): number {
    return ResourceService.getPrice(resourceName, quantity);
  }

  buyResource(player: Player, resourceName: ResourceEnum, quantity: number): void {
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

  setPlayersAbleToBuy(players: Player[]): void {
    // for each players
    // get possessed stations
    // count how many player can buy // stations * res consumption * CONST_NUMBER = 2 - possessed resources
    // set order
  }




  // required?

  getMostExpensiveResourcePrice(stations: Resource[]): number {
    // if (!stations) {
    //   throw ResourceStageError.STATIONS_INCORRECT(stations);
    // }
    // let price = 0;
    // stations.forEach(station => {
    //   if (station.price > price) {
    //     price = station.price;
    //   }
    // });
    // return price;
  }

  getCurrentPlayer() {
    // if (this.playersAbleToBuy.length < 1) {
    //   throw new Error('There is no players able to buy a station');
    // }
    // return this.playersAbleToBuy[0];
  }

  getResourcesToBuy() {
    // return ResourceService.getCurrentResources();
  }

  getNextResources(): {
    // return ResourceService.getNextResources();
  }

  setActualResource(station: Resource, player: Player, price: number = 0): void {
    // if (!station) {
    //   throw ResourceStageError.STATION_INCORRECT(station);
    // } else if (this.actualResource) {
    //   throw ResourceStageError.STATION_ALREADY_SET(this.actualResource);
    // } else if (!player) {
    //   throw ResourceStageError.PLAYER_INCORRECT(player);
    // } else if (
    //   this.playerWithHighestWage &&
    //   this.playerWithHighestWage.id === player.id
    // ) {
    //   throw ResourceStageError.PLAYER_THE_SAME(player);
    // } else if (price && price < station.price) {
    //   throw ResourceStageError.PRICE_INCORRECT(price);
    // }
    // this.actualResource = station;
    // this.playerWithHighestWage = player;
    // this.actualPrice = price > station.price ? price : station.price;
  }

  outbidAuction(player: Player, price: number): void {
    // if (!player) {
    //   throw ResourceStageError.PLAYER_INCORRECT(player);
    // } else if (!price) {
    //   throw ResourceStageError.PRICE_INCORRECT(price);
    // } else if (this.playerWithHighestWage === player) {
    //   throw ResourceStageError.PLAYER_THE_SAME(player);
    // } else if (price <= this.actualPrice) {
    //   throw ResourceStageError.PRICE_TOO_LOW(price, this.actualPrice);
    // } else if (player.cash < price) {
    //   throw ResourceStageError.PRICE_NO_ENOUGH(price);
    // }
    // this.actualPrice = price;
    // this.playerWithHighestWage = player;
  }

  removePlayerAbleToBuy(playerToRemove: Player) {
    // if (!playerToRemove) {
    //   throw ResourceStageError.PLAYER_INCORRECT(playerToRemove);
    // }
    // this.playersAbleToBuy = this.playersAbleToBuy.filter(
    //   player => player.id !== playerToRemove.id
    // );
  }

  removeResource(): void {
    // if (!this.actualResource) {
    //   throw ResourceStageError.NO_ACTUAL_STATION();
    // }
    // ResourceService.removeResource(this.actualResource.id);
    // this.actualResource = null;
    // this.actualPrice = 0;
  }

  isStageFinished() {
    // return (this.playersAbleToBuy || []).length === 0;
  }
}
