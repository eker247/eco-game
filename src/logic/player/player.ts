import { House } from '../house';
import { SettingService } from '../setting.service';
import { ResourceBag } from '../stages/resource/resource.enum';
import { Station } from '../stages/station/station';
import { PlayerError } from './player.error';

export class Player {
  id: number;
  name: string;
  cash: number;
  stations: Station[] = [];
  houses: House[] = [];
  resources = {};

  constructor(id: number, name: string, cash = SettingService.STARTING_CASH) {
    this.id = id;
    this.name = name;
    this.cash = cash;
  }

  earn(cash: number): void {
    if (!cash || typeof cash !== 'number' || cash < 1) {
      throw PlayerError.CASH_INCORRECT_VALUE(cash);
    }
    this.cash += cash;
  }

  spend(cash: number): void {
    if (!cash || typeof cash !== 'number' || cash < 1) {
      throw PlayerError.CASH_INCORRECT_VALUE(cash);
    } else if (cash > this.cash) {
      throw PlayerError.CASH_NO_ENOUGH(cash, this.cash);
    } else {
      this.cash -= cash;
    }
  }

  addStation(newStation: Station): void {
    if (!newStation) {
      throw PlayerError.STATION_INCORRECT(newStation);
    } else if (this.stations.some(station => station.id === newStation.id)) {
      throw PlayerError.STATION_ALREADY_ADDED(newStation);
    }
    this.stations.push(newStation);
  }

  removeStation(stationToRemove: Station): void {
    if (!stationToRemove) {
      throw PlayerError.STATION_INCORRECT(stationToRemove);
    } else if (
      !this.stations.some(station => station.id === stationToRemove.id)
    ) {
      throw PlayerError.PLAYER_HAS_NOT_STATION(stationToRemove);
    }
    this.stations = this.stations.filter(
      localStation => localStation !== stationToRemove
    );
  }

  addHouse(newHouse: House): void {
    if (!newHouse) {
      throw PlayerError.HOUSE_INCORRECT(newHouse);
    } else if (this.houses.some(house => house.id === newHouse.id)) {
      throw PlayerError.HOUSE_ALREADY_ADDED(newHouse);
    }
    this.houses.push(newHouse);
  }

  
}
