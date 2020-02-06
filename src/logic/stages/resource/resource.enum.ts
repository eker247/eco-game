import { Resource } from "./resource";

export enum ResourceEnum {
  COAL = 'Coal',
  OIL = 'Oil',
  TRASH = 'Trash',
  URAN = 'Uran',
  RENEWABLE = 'Renewable'
};

export type ResourceRepo = { [name in ResourceEnum]?: Resource };
export type ResourceBag = { [name in ResourceEnum]: number };
