import { getStations } from '../../logic/stages/station/get-stations';
import { Player } from './player';

const CASH = 100;

export class PlayerMock {
  static players: Player[] = [
    new Player(1, 'Player One', CASH),
    new Player(2, 'Player Two', CASH),
    new Player(3, 'Player Three', CASH),
    new Player(4, 'Player Four', CASH),
    new Player(5, 'Player Five', CASH),
    new Player(6, 'Player Six', CASH),
    new Player(7, 'Player Seven', CASH),
    new Player(8, 'Player Eight', CASH)
  ];
  static stations = getStations();

  static getNPlayers(numberOfPlayers = 4): Player[] {
    this.players.forEach(player => {
      const n = 3 * player.id;
      player.houses = [
        { id: n, axisX: n, axisY: n },
        { id: n + 1, axisX: n + 1, axisY: n + 1 },
        { id: n + 2, axisX: n + 2, axisY: n + 2 }
      ];
      player.stations = [this.stations[player.id]];
      player.resources[player.stations[0].resource] = player.id % 4 + 2;
    });
    return this.players.slice(0, numberOfPlayers);
  }
}
