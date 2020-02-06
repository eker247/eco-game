import { ResourceEnum } from "../resource/resource.enum";

export class Station {
  id: number;
  level: number;
  price: number;
  name: string;
  resource: ResourceEnum;
  quantity: number;
  efficiency: number;
}
