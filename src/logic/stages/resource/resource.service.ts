import { getResources } from './get-resources';
import { Resource } from './resource';
import { ResourceEnum, ResourceRepo } from './resource.enum';
import { ResourceError } from './resource.error';

export class ResourceService {
  static resRepo: ResourceRepo = getResources();

  static getPrice(resourceName: ResourceEnum, quantity: number) {
    if (!resourceName || !this.resRepo[resourceName]) {
      throw ResourceError.RESOURCE_NOT_EXIST(resourceName);
    } else if (quantity < 1) {
      throw ResourceError.NUMBER_INCORRECT(quantity);
    } else if (quantity > this.resRepo[resourceName].availableItems) {
      throw ResourceError.RESOURCE_NO_ENOUGH(
        quantity,
        this.resRepo[resourceName].availableItems
      );
    }

    let resource = this.resRepo[resourceName];
    let total = 0;

    while (quantity-- && resource.availableItems) {
      const current =
        resource.startPrice -
        Math.ceil(resource.availableItems-- / resource.perPrice) +
        1;
      total += current;
    }

    return total;
  }

  static getItems(resourceName: ResourceEnum, quantity: number): number {
    if (!resourceName || !this.resRepo[resourceName]) {
      throw ResourceError.RESOURCE_NOT_EXIST(resourceName);
    } else if (quantity < 1) {
      throw ResourceError.NUMBER_INCORRECT(quantity);
    } else if (quantity > this.resRepo[resourceName].availableItems) {
      throw ResourceError.RESOURCE_NO_ENOUGH(
        quantity,
        this.resRepo[resourceName].availableItems
      );
    }
    this.resRepo[resourceName].availableItems -= quantity;
    return quantity;
  }
}
