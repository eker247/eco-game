import { ResourceEnum } from "../resource/resource.enum";

export interface Station {
  id: number;
  level: number;
  price: number;
  name: string;
  resource: ResourceEnum;
  resourceConsumption: number;
  efficiency: number;
}
