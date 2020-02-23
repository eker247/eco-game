import { House } from '../stages/house/house';
import { SettingService } from '../setting.service';
import { Station } from '../stages/station/station';
import { ResourceBag } from '../stages/resource/resource.enum';

export class Player {
  id: number;
  name: string;
  cash: number;
  stations: Station[] = [];
  houses: House[] = [];
  resources: ResourceBag = {};

  constructor(id: number, name: string, cash = SettingService.STARTING_CASH) {
    this.id = id;
    this.name = name;
    this.cash = cash;
  }

  earn(cash: number): void {
    if (!cash || typeof cash !== 'number' || cash < 1) {
      throw new Error('Player.earn - Incorrect value');
    }
    this.cash += cash;
  }

  spend(cash: number): void {
    if (!cash || typeof cash !== 'number' || cash < 1) {
      throw new Error('Player.spend - Incorrect value');
    } else if (cash > this.cash) {
      throw new Error('Player.spend - No enough cash');
    } else {
      this.cash -= cash;
    }
  }

  addStation(newStation: Station): void {
    if (!newStation) {
      throw new Error(`Player.addStation - Adding station is incorrect ${newStation}`);
    } else if (this.stations.some(station => station.id === newStation.id)) {
      throw new Error(`Player.addStation - Player already has station ${newStation}`);
    }
    this.stations.push(newStation);
  }

  removeStation(stationToRemove: Station): void {
    if (!stationToRemove) {
      throw new Error('Player.removeStation - Incorrect station');
    } else if (
      !this.stations.some(station => station.id === stationToRemove.id)
    ) {
      throw new Error('Player.removeStation - Player has not this station');
    }
    this.stations = this.stations.filter(
      localStation => localStation !== stationToRemove
    );
  }

  addHouse(newHouse: House): void {
    if (!newHouse) {
      throw new Error('Player.addHouse - House incorrect');
    } else if (this.houses.some(house => house.id === newHouse.id)) {
      throw new Error('Player.addHouse - House already exist');
    }
    this.houses.push(newHouse);
  }
}
