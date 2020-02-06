import { Player } from "./logic/player/player";
import { StationStage } from "./logic/stages/station/station.stage";
import { Resource } from "./logic/stages/resource/resource";
import { ResourceEnum } from "./logic/stages/resource/resource.enum";
import { ResourceService } from "./logic/stages/resource/resource.service";

const players: Player[] = [
  new Player(1, 'Adin'),
  new Player(2, 'Dwa'),
  new Player(3, 'Tri'),
];

const coal: Resource = {
  name: ResourceEnum.COAL,
  availableItems: 25, 
  startPrice: 10,
  perPrice: 3,
};

const player = players[0];

new ResourceService();

console.log(player);
