import { Resource } from './resource';
import { ResourceEnum } from './resource.enum';
import { Player } from '../../player/player';

describe('resource.spec.ts', () => {
  let resource: Resource;
  let player: Player;

  beforeEach(() => {
    resource = new Resource();
    resource.name = ResourceEnum.COAL;
    resource.availableItems = 25;
    resource.startPrice = 10;
    resource.perPrice = 3;
    player = new Player(1, 'One', 20);
  });

  describe('buy', () => {
    it('should calculate price of n items', () => {
      const price = resource.getPrice(2);
      expect(price).toEqual(5);
    });
  });
});
