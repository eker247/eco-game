import { Player } from '../../player';
import { SettingService } from '../../setting.service';
import { House } from './house';

export class HouseService {
  static housesOnMap: House[];

  static putHousesOnMap(): void {
    this.housesOnMap = [];
    const numberOfHouses =
      SettingService.NUMBER_OF_PLAYERS * SettingService.HOUSES_PER_PLAYER;
    let houseId = 1;
    const houseCoordinates = {};
    while (houseId <= numberOfHouses) {
      const house: House = {
        id: houseId,
        axisX: Math.floor(Math.random() * SettingService.BOARD_WIDTH),
        axisY: Math.floor(Math.random() * SettingService.BOARD_HEIGHT),
        players: []
      };
      const key = `${house.axisX},${house.axisY}`;
      if (!houseCoordinates[key]) {
        this.housesOnMap.push(house);
        houseCoordinates[key] = true;
        ++houseId;
      }
    }
  }

  static getHouses(): House[] {
    return this.housesOnMap;
  }

  static buyFirstHouse(player: Player, house: House): void {
    if ((player.houses || []).length) {
      throw new Error('HS.buyFirstHouse - Player already has some houses');
    } else if ((house.players || []).length) {
      throw new Error('HS.buyFirstHouse - House already has owner');
    } else if (player.cash < SettingService.HOUSE_BASIC_PRICE) {
      throw new Error('HS.buyFirstHouse - Player has no enough cash');
    }
    house.players = [player];
    player.houses = [...(player.houses || []), house];
    player.cash -= SettingService.HOUSE_BASIC_PRICE;
  }

  static getHousePrice(player: Player, pathToHouse: House[]): number {
    if ((pathToHouse || []).length < 2) {
      throw new Error('HS.getHousePrice - Path has to be defined');
    } else if (
      !pathToHouse[0].players.some(pathPlayer => pathPlayer.id === player.id)
    ) {
      throw new Error("HS.getHousePrice - Have to start from player's house");
    }
    const lastHouse = pathToHouse[pathToHouse.length - 1];
    if (lastHouse.players.some(pathPlayer => pathPlayer.id === player.id)) {
      throw new Error('HS.getHousePrice - Player already posses this house');
    } else if (
      (lastHouse.players || []).length >= SettingService.LEVEL ||
      (lastHouse.players || []).length >= SettingService.HOUSE_MAX_OWNERS
    ) {
      throw new Error(
        'HS.getHousePrice - There is no possibility to put new player to this house yet'
      );
    }
    let distancePrice = 0;
    const pathLength = pathToHouse.length;
    for (let i = 1; i < pathLength; ++i) {
      distancePrice += this.computeDistancePrice(
        pathToHouse[i - 1],
        pathToHouse[i]
      );
    }
    const housePrice =
      SettingService.HOUSE_BASIC_PRICE +
      (lastHouse.players || []).length * SettingService.HOUSE_EXTRA_PRICE;
    return housePrice + distancePrice;
  }

  static computeDistancePrice(start: House, end: House): number {
    const distance = Math.sqrt(
      Math.pow(start.axisX - end.axisX, 2) +
        Math.pow(start.axisY - end.axisY, 2)
    );
    return Math.floor(
      Math.pow(distance / SettingService.HOUSE_PRICE_DIVISOR, 2)
    );
  }

  static buyNextHouse(player: Player, pathToHouse: House[]): void {
    const price = this.getHousePrice(player, pathToHouse);
    const house = pathToHouse[pathToHouse.length - 1];
    if (player.cash < price) {
      throw new Error('HS.buyStation - Player has no enough cash');
    }
    house.players = [...(house.players || []), player];
    player.houses = [...(player.houses || []), house];
    player.cash -= price;
    this.promoteLevel(player.houses.length);
  }

  static promoteLevel(housesNumber: number): void {
    const level =
      1 + Math.floor(housesNumber / SettingService.HOUSES_TO_PROMOTE_LEVEL);
    if (level > SettingService.LEVEL) {
      SettingService.LEVEL = level;
    }
  }
}
