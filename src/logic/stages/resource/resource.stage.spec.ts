import { Player } from '../../player/player';
import { getStations } from '../station/get-stations';
import { Station } from '../station/station';
import { ResourceEnum } from './resource.enum';
import { ResourceStage } from './resource.stage';

describe('resource.stage.spec.ts', () => {
  let resourceStage: ResourceStage;
  let players: Player[];
  let stations: Station[];

  beforeEach(() => {
    stations = getStations();
    players = [
      new Player(1, 'One', 10),
      new Player(2, 'Two', 50),
      new Player(3, 'Three', 30),
      new Player(4, 'Four', 40)
    ];
    players[0].stations.push(stations[0]);
    players[1].stations.push(stations[1]);
    players[2].stations.push(stations[2]);
    players[3].stations.push(stations[3]);
    resourceStage = new ResourceStage(players);
  });

  it('should create', () => {
    expect(resourceStage).toBeTruthy();
  });

  describe('getPrice', () => {
    it('should return correct price', () => {
      expect(resourceStage.getPrice(ResourceEnum.COAL, 1)).toEqual(3);
    });
  });

  describe('buyResource', () => {
    it('player 0 should buy 1 coal', () => {
      resourceStage.buyResource(players[0], ResourceEnum.COAL, 1);
      expect(players[0].resources[ResourceEnum.COAL]).toEqual(1);
    });

    it('player 1 should buy 3 coals', () => {
      resourceStage.buyResource(players[1], ResourceEnum.COAL, 3);
      expect(players[1].resources[ResourceEnum.COAL]).toEqual(3);
    });

    it('should throw an error', () => {
      expect(() =>
        resourceStage.buyResource(players[2], ResourceEnum.TRASH, 5)
      ).toThrow();
      expect(() =>
        resourceStage.buyResource(null, ResourceEnum.TRASH, 5)
      ).toThrow();
      expect(() => resourceStage.buyResource(players[2], null, 1)).toThrow();
      expect(() =>
        resourceStage.buyResource(players[2], ResourceEnum.TRASH, null)
      ).toThrow();
    });
  });

  it('should set 4 players', () => {
    expect(resourceStage.playersAbleToBuy.length).toEqual(4);
  });

  describe('setPlayersAbleToBuy', () => {
    it('should set 4 players', () => {
      expect(resourceStage.playersAbleToBuy.length).toEqual(4);
    });

    it('should set 3 players', () => {
      players[0].cash = 100;
      expect(resourceStage.playersAbleToBuy.length).toEqual(3);
    });

  });
});
