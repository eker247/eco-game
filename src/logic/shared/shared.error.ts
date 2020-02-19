export class SharedError {
  static PRICE_INCORRECT(price: any): Error {
    return new Error(`Incorrect price: ${price}`);
  }
  static PRICE_TOO_LOW(price: number, actualPrice: number): Error {
    return new Error(
      `Given price is lower than actual: ${price} <= ${actualPrice}`
    );
  }
  static PRICE_NO_ENOUGH(price: any): Error {
    return new Error(`User has not enough cash: ${price}`);
  }
}
