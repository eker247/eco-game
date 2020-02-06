import { Player } from '../../player/player';
import { Station } from './station';
import { StationService } from './station.service';
import { StationStageError } from './station.stage.error';

export class StationStage {
  actualPrice: number;
  actualStation: Station;
  availableStations: Station[];
  playersAbleToBuy: Player[];
  playerWithHighestWage: Player;

  constructor(players: Player[] = []) {
    this.setPlayersAbleToBuy(players);
  }

  setPlayersAbleToBuy(players: Player[]): void {
    if (this.playersAbleToBuy) {
      throw StationStageError.PLAYERS_ALREADY_EXIST(this.playersAbleToBuy);
    }
    const lowestStationPrice = StationService.getCheapestStationPrice();

    this.playersAbleToBuy = players
      .filter(player => player.cash >= lowestStationPrice)
      .sort((p1, p2) => {
        const housesLengthDif = p1.houses.length - p2.houses.length;
        return (
          housesLengthDif ||
          this.getMostExpensiveStationPrice(p1.stations) -
            this.getMostExpensiveStationPrice(p2.stations)
        );
      });
  }

  getMostExpensiveStationPrice(stations: Station[]): number {
    if (!stations) {
      throw StationStageError.STATIONS_INCORRECT(stations);
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
    if (this.playersAbleToBuy.length < 1) {
      throw new Error('There is no players able to buy a station');
    }
    return this.playersAbleToBuy[0];
  }

  getStationsToBuy(): Station[] {
    return StationService.getCurrentStations();
  }

  getNextStations(): Station[] {
    return StationService.getNextStations();
  }

  setActualStation(station: Station, player: Player, price: number = 0): void {
    if (!station) {
      throw StationStageError.STATION_INCORRECT(station);
    } else if (this.actualStation) {
      throw StationStageError.STATION_ALREADY_SET(this.actualStation);
    } else if (!player) {
      throw StationStageError.PLAYER_INCORRECT(player);
    } else if (
      this.playerWithHighestWage &&
      this.playerWithHighestWage.id === player.id
    ) {
      throw StationStageError.PLAYER_THE_SAME(player);
    } else if (price && price < station.price) {
      throw StationStageError.PRICE_INCORRECT(price);
    } else if (price > player.cash) {
      throw StationStageError.PRICE_NO_ENOUGH;
    }
    this.actualStation = station;
    this.playerWithHighestWage = player;
    this.actualPrice = price > station.price ? price : station.price;
  }

  outbidAuction(player: Player, price: number): void {
    if (!player) {
      throw StationStageError.PLAYER_INCORRECT(player);
    } else if (!price) {
      throw StationStageError.PRICE_INCORRECT(price);
    } else if (this.playerWithHighestWage === player) {
      throw StationStageError.PLAYER_THE_SAME(player);
    } else if (price <= this.actualPrice) {
      throw StationStageError.PRICE_TOO_LOW(price, this.actualPrice);
    } else if (player.cash < price) {
      throw StationStageError.PRICE_NO_ENOUGH(price);
    }
    this.actualPrice = price;
    this.playerWithHighestWage = player;
  }

  buyStation(): void {
    this.playerWithHighestWage.addStation(this.actualStation);
    this.playerWithHighestWage.spend(this.actualPrice);
    this.removeStation();
    this.removePlayerAbleToBuy(this.playerWithHighestWage);
    this.playerWithHighestWage = null;
  }

  removePlayerAbleToBuy(playerToRemove: Player) {
    if (!playerToRemove) {
      throw StationStageError.PLAYER_INCORRECT(playerToRemove);
    }
    this.playersAbleToBuy = this.playersAbleToBuy.filter(
      player => player.id !== playerToRemove.id
    );
  }

  removeStation(): void {
    if (!this.actualStation) {
      throw StationStageError.NO_ACTUAL_STATION();
    }
    StationService.removeStation(this.actualStation.id);
    this.actualStation = null;
    this.actualPrice = 0;
  }

  isStageFinished(): boolean {
    return (this.playersAbleToBuy || []).length === 0;
  }
}
