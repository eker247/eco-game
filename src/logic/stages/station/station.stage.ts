// import { Player } from '../../player/player';
import { Player } from '../../player/index';
import { PlayerService } from '../../player/player.service';
import { Stage } from '../stage';
import { Station } from './station';
import { StationService } from './station.service';

export class StationStage extends Stage {
  actualPrice: number;
  actualStation: Station;
  availableStations: Station[];
  stagePlayers: Player[] = PlayerService.getPlayersDescending();
  playerWithHighestWage: Player;

  constructor() {
    super();
    this.stagePlayers = PlayerService.getPlayersDescending();
    this.setStagePlayers();
  }

  setStagePlayers(): void {
    const lowestStationPrice = StationService.getCheapestStationPrice();
    this.stagePlayers = this.stagePlayers.filter(
      player => player.cash >= lowestStationPrice
    );
  }

  getMostExpensiveStationPrice(stations: Station[]): number {
    if (!stations) {
      throw new Error(
        'StatSt.getMostExpensiveStationPrice - Incorrect stations'
      );
    }
    let price = 0;
    stations.forEach(station => {
      if (station.price > price) {
        price = station.price;
      }
    });
    return price;
  }

  getCurrentPlayer(): Player {
    if (this.stagePlayers.length < 1) {
      throw new Error('There is no players able to buy a station');
    }
    return this.stagePlayers[0];
  }

  getStationsToBuy(): Station[] {
    return StationService.getCurrentStations();
  }

  getNextStations(): Station[] {
    return StationService.getNextStations();
  }

  setActualStation(station: Station, player: Player, price: number = 0): void {
    if (!station) {
      throw new Error('StatSt.setActualStation - Station incorrect');
    } else if (this.actualStation) {
      throw new Error('StatSt.setActualStation - Station already set');
    } else if (!player) {
      throw new Error('StatSt.setActualStation - Player incorrect');
    } else if (
      this.playerWithHighestWage &&
      this.playerWithHighestWage.id === player.id
    ) {
      throw new Error('StatSt.setActualStation - Player the same');
    } else if (price && price < station.price) {
      throw new Error('StatSt.setActualStation - Price incorrect');
    } else if (price > player.cash) {
      throw new Error('StatSt.setActualStation - No enough cash');
    }
    this.actualStation = station;
    this.playerWithHighestWage = player;
    this.actualPrice = price > station.price ? price : station.price;
  }

  outbidAuction(player: Player, price: number): void {
    if (!player) {
      throw new Error('StatSt.outbidAuction - Player incorrect');
    } else if (!price) {
      throw new Error('StatSt.outbidAuction - Price incorrect');
    } else if (this.playerWithHighestWage === player) {
      throw new Error('StatSt.outbidAuction - Player the same');
    } else if (price <= this.actualPrice) {
      throw new Error('StatSt.outbidAuction - Price to low');
    } else if (player.cash < price) {
      throw new Error('StatSt.outbidAuction - Price no enough');
    }
    this.actualPrice = price;
    this.playerWithHighestWage = player;
  }

  buyStation(): void {
    this.playerWithHighestWage.addStation(this.actualStation);
    this.playerWithHighestWage.spend(this.actualPrice);
    this.removeStation();
    this.removeCurrentPlayer();
    this.playerWithHighestWage = null;
  }

  removeCurrentPlayer() {
    if (!this.playerWithHighestWage) {
      throw new Error('StatSt.removePlayerAbleToBuy - Player incorrect');
    }
    this.stagePlayers = this.stagePlayers.filter(
      player => player !== this.playerWithHighestWage
    );
  }

  removeStation(): void {
    if (!this.actualStation) {
      throw new Error('StatSt.removeStations - No actual station');
    }
    StationService.removeStation(this.actualStation.id);
    this.actualStation = null;
    this.actualPrice = 0;
  }
}
