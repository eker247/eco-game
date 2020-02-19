export class StationError {
  static PLAYERS_ALREADY_EXIST(players: any): Error {
    return new Error(`Players already exist: ${players}`);
  }
  static PLAYER_INCORRECT(player: any): Error {
    return new Error(`Incorrect player: ${player}`);
  }
  static PLAYER_THE_SAME(player: any): Error {
    return new Error(`Player can not overbid himself: ${player}`);
  }
  static STATIONS_INCORRECT(stations: any): Error {
    return new Error(`Incorrect station array: ${stations}`);
  }
  static STATION_INCORRECT(station: any): Error {
    return new Error(`Incorrect station: ${station}`);
  }
  static STATION_ALREADY_SET(station: any): Error {
    return new Error(`Station is already set: ${station}`);
  }
  static NO_ACTUAL_STATION(): Error {
    return new Error(`Actual station is not set`);
  }
}
