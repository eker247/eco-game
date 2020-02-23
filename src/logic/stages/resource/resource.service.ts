import { getResources } from './get-resources';
import { ResourceEnum, ResourceRepo } from './resource.enum';

export class ResourceService {
  static resRepo: ResourceRepo = getResources();

  static getPrice(resourceName: ResourceEnum, quantity: number) {
    if (!resourceName || !this.resRepo[resourceName]) {
      throw new Error(`RS.getPrice - resource not exist ${resourceName}`);
    } else if (quantity < 1) {
      throw new Error(`RS.getPrice - requested incorrect quantity ${quantity}`);
    } else if (quantity > this.resRepo[resourceName].availableItems) {
      throw new Error(
        `RS.getPrice - requested quantity: ${quantity}, available: ${this.resRepo[resourceName].availableItems}`
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
      throw new Error('RS.getItems - Resource not exist');
    } else if (quantity < 1) {
      throw new Error('RS.getItems - Number incorrect');
    } else if (quantity > this.resRepo[resourceName].availableItems) {
      throw new Error('RS.getItems - Resource not exist');
    }
    this.resRepo[resourceName].availableItems -= quantity;
    return quantity;
  }
}
