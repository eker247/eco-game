import { ResourceEnum, ResourceRepo } from './resource.enum';

export function getResources(): ResourceRepo {
  return {
    [ResourceEnum.COAL]: {
      name: ResourceEnum.COAL,
      availableItems: 25,
      startPrice: 10,
      perPrice: 3
    },
    [ResourceEnum.OIL]: {
      name: ResourceEnum.OIL,
      availableItems: 20,
      startPrice: 10,
      perPrice: 3
    },
    [ResourceEnum.TRASH]: {
      name: ResourceEnum.TRASH,
      availableItems: 15,
      startPrice: 10,
      perPrice: 3
    },
    [ResourceEnum.URAN]: {
      name: ResourceEnum.URAN,
      availableItems: 3,
      startPrice: 16,
      perPrice: 1
    }
  };
}
