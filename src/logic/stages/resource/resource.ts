import { Player } from '../../player/player';
import { ResourceEnum } from './resource.enum';

export interface Resource {
  name: ResourceEnum;
  availableItems: number;
  startPrice: number;
  perPrice: number;
}
