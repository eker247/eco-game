import { Resource } from './resource';
import { ResourceEnum } from './resource.enum';
import { Player } from '../../player/player';

describe('resource.spec.ts', () => {
  let resource: Resource;
  let player: Player;

  beforeEach(() => {
    resource = {
      name: ResourceEnum.COAL,
      availableItems: 25,
      startPrice: 10,
      perPrice: 3,
    };
    player = new Player(1, 'One', 20);
  });

  it('Empty', () => {
    expect(true).toBeTruthy();
  });

});
