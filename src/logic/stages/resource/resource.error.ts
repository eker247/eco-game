export class ResourceError {
  static NUMBER_INCORRECT(value: any): Error {
    return new Error(`Incorrect number${value}`);
  }
  static RESOURCE_NO_ENOUGH(expected: number, current: number): Error {
    return new Error(`Incorrect number: ${expected} > ${current}`);
  }
  static RESOURCE_NOT_EXIST(resource: any): Error {
    return new Error(`Incorrect resource: ${resource}`);
  }
}
