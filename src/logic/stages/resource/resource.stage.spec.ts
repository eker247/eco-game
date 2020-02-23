import { Player } from '../../player/player';
import { getStations } from '../station/get-stations';
import { Station } from '../station/station';
import { ResourceEnum } from './resource.enum';
import { ResourceStage } from './resource.stage';
import { ResourceService } from './resource.service';
import { PlayerService } from '../../player';

describe('resource.stage.spec.ts', () => {
  let resourceStage: ResourceStage;
  let players: Player[];
  let stations: Station[];

  beforeAll(() => {
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
    resourceStage = new ResourceStage();
  });

  it('should create', () => {
    expect(resourceStage).toBeTruthy();
  });

  describe('getPrice', () => {
    it('should return correct price', () => {
      ResourceService.resRepo[ResourceEnum.COAL].availableItems = 25;
      expect(resourceStage.getPrice(ResourceEnum.COAL, 2)).toEqual(5);
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

  describe('setPlayersAbleToBuy', () => {
    it('should set 4 players', () => {
      PlayerService.setOrder();
      resourceStage.playersAbleToBuy = PlayerService.getPlayersAscending();
      expect(resourceStage.playersAbleToBuy.length).toEqual(4);
    });

    it('should set 3 players', () => {
      PlayerService.players[1].cash = 0;
      resourceStage.setPlayersAbleToBuy()
      expect(resourceStage.playersAbleToBuy.length).toEqual(3);
    });
  });

  describe('getCurrentPlayer', () => {
    it('should return 1st player', () => {
      expect(resourceStage.getCurrentPlayer().id).toEqual(1);
    });
  });

  describe('removeCurrentPlayer', () => {
    beforeEach(function() {
      PlayerService.setOrder();
      resourceStage.playersAbleToBuy = PlayerService.getPlayersAscending();
    });

    it('should have 4 players', () => {
      expect(resourceStage.playersAbleToBuy.length).toEqual(4);
    });

    it('should have 3 players', () => {
      resourceStage.removeCurrentPlayer();
      expect(resourceStage.playersAbleToBuy.length).toEqual(3);
    });

    it('should have 1 player', () => {
      resourceStage.removeCurrentPlayer();
      resourceStage.removeCurrentPlayer();
      resourceStage.removeCurrentPlayer();
      expect(resourceStage.playersAbleToBuy.length).toEqual(1);
    });

    it('should throw an error', () => {
      resourceStage.removeCurrentPlayer();
      resourceStage.removeCurrentPlayer();
      resourceStage.removeCurrentPlayer();
      resourceStage.removeCurrentPlayer();
      expect(() => resourceStage.removeCurrentPlayer()).toThrow();
    });
  });

  describe('isStageFinished', () => {
    beforeAll(function() {
      PlayerService.setOrder();
      resourceStage.playersAbleToBuy = PlayerService.getPlayersAscending();
    });

    it('should should return false', () => {
      expect(resourceStage.isStageFinished()).toBeFalsy();
      resourceStage.removeCurrentPlayer();
      expect(resourceStage.isStageFinished()).toBeFalsy();
      resourceStage.removeCurrentPlayer();
      expect(resourceStage.isStageFinished()).toBeFalsy();
      resourceStage.removeCurrentPlayer();
      expect(resourceStage.isStageFinished()).toBeFalsy();
    });

    it('should should return true', () => {
      resourceStage.removeCurrentPlayer();
      expect(resourceStage.isStageFinished()).toBeTruthy();
    });
  });
});
