import { SettingService } from '../../setting.service';
import { getStations } from './get-stations';
import { Station } from './station';

export class StationService {
  static stations: Station[] = [...getStations()];

  static getStations(): Station[] {
    return this.stations.slice(0, 8);
  }

  static removeStation(id: number): void {
    this.stations = this.stations.filter(oldStation => oldStation.id !== id);
  }

  static getCurrentStations(): Station[] {
    return SettingService.LEVEL < SettingService.CRITIC_LEVEL
      ? this.stations.slice(0, SettingService.STATIONS_PART)
      : this.stations.slice(0, SettingService.STATIONS_ALL);
  }

  static getNextStations(): Station[] {
    return SettingService.LEVEL < SettingService.CRITIC_LEVEL
      ? this.stations.slice(
          SettingService.STATIONS_PART,
          SettingService.STATIONS_ALL
        )
      : [];
  }

  static getCheapestStationPrice(): number {
    return this.stations[0].price;
  }
}
