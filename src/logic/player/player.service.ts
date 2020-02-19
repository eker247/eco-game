import { Player } from './player';
import { PlayerMock } from './player.mock';

export class PlayerService {
  static players: Player[] = PlayerMock.getNPlayers(4);
  static orderedPlayers: { [key: number]: Player } = {};

  static getPlayersAscending(): Player[] {
    return Object.keys(this.orderedPlayers).map(
      key => this.orderedPlayers[key]
    );
  }

  static getPlayersDescending(): Player[] {
    const descending = Object.keys(this.orderedPlayers).sort(
      (a, b) => Number.parseInt(b) - Number.parseFloat(a)
    );
    return descending.map(
      key => this.orderedPlayers[Number.parseInt(key)]
    );
  }

  static setOrder(): void {
    let order = 0;
    this.orderedPlayers = {};
    this.players.forEach(player => {
      // count houses
      order += player.houses.length << 24;
      // price of most expensive station
      order +=
        Math.max.apply(
          Math,
          player.stations.map(station => station.price)
        ) << 16;
      // cash
      order += player.cash << 4;
      // player id
      order += player.id;
      this.orderedPlayers[order] = player;
    });
  }

  static setPlayers(players: Player[]): void {
    this.players = [...players];
  }

  static isGameOver(): boolean {
    return this.players.some(player => player.houses.length > 10);
  }
}
