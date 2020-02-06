import { getResources } from './get-resources';
import { Resource } from './resource';
import { ResourceEnum, ResourceRepo } from './resource.enum';
import { ResourceError } from './resource.error';

export class ResourceService {
  static resources: ResourceRepo = getResources();

  static getPrice(resourceName: ResourceEnum, quantity: number) {
    if (!resourceName || !this.resources[resourceName]) {
      throw ResourceError.RESOURCE_NOT_EXIST(resourceName);
    } else if (quantity < 1) {
      throw ResourceError.NUMBER_INCORRECT(quantity);
    } else if (quantity > this.resources[resourceName].availableItems) {
      throw ResourceError.RESOURCE_NO_ENOUGH(
        quantity,
        this.resources[resourceName].availableItems
      );
    }

    let resource = this.resources[resourceName];
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
    if (!resourceName || !this.resources[resourceName]) {
      throw ResourceError.RESOURCE_NOT_EXIST(resourceName);
    } else if (quantity < 1) {
      throw ResourceError.NUMBER_INCORRECT(quantity);
    } else if (quantity > this.resources[resourceName].availableItems) {
      throw ResourceError.RESOURCE_NO_ENOUGH(
        quantity,
        this.resources[resourceName].availableItems
      );
    }
    this.resources[resourceName].availableItems -= quantity; 
    return quantity;
  }
}
