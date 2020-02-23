import { Player } from '../../player';

export interface House {
  id: number;
  axisX: number;
  axisY: number;
  players?: Player[];
}
