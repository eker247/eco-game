import { PlayerService } from '../../player';
import { Player } from '../../player/player';
import { HouseStage } from './house.stage';
import { SettingService } from '../../setting.service';

describe('house.stage.spec.ts', () => {
  let houseStage: HouseStage;
  let players: Player[];

  beforeAll(() => {
    houseStage = new HouseStage();
    players = PlayerService.getPlayersAscending();
  });

  it('should create', () => {
    expect(houseStage).toBeTruthy();
  });

  describe('setPlayersAbleToBuy', () => {
    it('should set one player', () => {
      PlayerService.setOrder();
      houseStage.playersAbleToBuy = [
        new Player(1, 'One', 100),
        new Player(2, 'Two', 5),
      ];
      houseStage.setPlayersAbleToBuy();
      expect(houseStage.playersAbleToBuy.length).toEqual(1);
    });

    it('should set two player', () => {
      SettingService.LEVEL = 2;
      PlayerService.setOrder();
      houseStage.playersAbleToBuy = [
        new Player(1, 'One', 100),
        new Player(2, 'Two', 10),
        new Player(3, 'Three', 30),
      ];
      houseStage.setPlayersAbleToBuy();
      expect(houseStage.playersAbleToBuy.length).toEqual(2);
    });

    it('should set no player', () => {
      PlayerService.setOrder();
      houseStage.playersAbleToBuy = [];
      houseStage.setPlayersAbleToBuy();
      expect(houseStage.playersAbleToBuy.length).toEqual(0);
    });
  });

  describe('getCurrentPlayer', () => {
    beforeEach(function() {
      PlayerService.setOrder();
      houseStage.playersAbleToBuy = [
        new Player(1, 'One'),
        new Player(2, 'Two')
      ];
      houseStage.setPlayersAbleToBuy();
    });

    it('should return current player', () => {
      const player = houseStage.getCurrentPlayer();
      expect(player).toEqual(houseStage.playersAbleToBuy[0]);
    });

    it('should throw an error', () => {
      houseStage.removeCurrentPlayer();
      houseStage.removeCurrentPlayer();
      expect(() => houseStage.getCurrentPlayer()).toThrow();
    });
  });

  describe('removeCurrentPlayer', () => {
    beforeEach(function() {
      PlayerService.setOrder();
      houseStage.playersAbleToBuy = [
        new Player(1, 'One'),
        new Player(2, 'Two')
      ];
      houseStage.setPlayersAbleToBuy();
    });

    it('should remove player', () => {
      expect(houseStage.playersAbleToBuy.length).toEqual(2);
      houseStage.removeCurrentPlayer();
      expect(houseStage.playersAbleToBuy.length).toEqual(1);
    });

    it('should throw an error', () => {
      houseStage.removeCurrentPlayer();
      houseStage.removeCurrentPlayer();
      expect(() => houseStage.removeCurrentPlayer()).toThrow();
    });
  });

  describe('isStageFinished', () => {
    beforeEach(function() {
      PlayerService.setOrder();
      houseStage.playersAbleToBuy = PlayerService.getPlayersAscending();
    });

    it('should should return false', () => {
      expect(houseStage.isStageFinished()).toBeFalsy();
      houseStage.removeCurrentPlayer();
      expect(houseStage.isStageFinished()).toBeFalsy();
      houseStage.removeCurrentPlayer();
      expect(houseStage.isStageFinished()).toBeFalsy();
      houseStage.removeCurrentPlayer();
      expect(houseStage.isStageFinished()).toBeFalsy();
    });

    it('should should return true', () => {
      houseStage.removeCurrentPlayer();
      houseStage.removeCurrentPlayer();
      houseStage.removeCurrentPlayer();
      houseStage.removeCurrentPlayer();
      expect(houseStage.isStageFinished()).toBeTruthy();
    });

    it('should throw an error', () => {
      houseStage.removeCurrentPlayer();
      houseStage.removeCurrentPlayer();
      houseStage.removeCurrentPlayer();
      houseStage.removeCurrentPlayer();
      expect(() => houseStage.removeCurrentPlayer()).toThrow();
    });
  });
});
