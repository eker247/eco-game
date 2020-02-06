export class PlayerError {
  static CASH_NO_ENOUGH(price: number, cash: number): Error {
    return new Error(`Don't have enough cash: ${price} > ${cash}`);
  }
  static CASH_INCORRECT_VALUE(cash: number): Error {
    return new Error(`Incorrect value: ${cash}`);
  }
  static STATION_INCORRECT(station: any): Error {
    return new Error(`Incorrect station ${station}`);
  }
  static STATION_ALREADY_ADDED(station: any): Error {
    return new Error(`Player already has this station: ${station}`);
  }
  static PLAYER_HAS_NOT_STATION(station: any): Error {
    return new Error(`Player does not have this station: ${station}`);
  }
  static PLAYER_INCORRECT(player: any): Error {
    return new Error(`Incorrect player: ${player}`);
  }
  static HOUSE_INCORRECT(house: any): Error {
    return new Error(`Incorrect house: ${house}`);
  }
  static HOUSE_ALREADY_ADDED(house: any): Error {
    return new Error(`Player already has this house: ${house}`);
  }
}