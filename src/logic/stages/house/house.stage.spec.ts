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

  describe('setStagePlayers', () => {
    it('should set one player', () => {
      PlayerService.setOrder();
      houseStage.stagePlayers = [
        new Player(1, 'One', 100),
        new Player(2, 'Two', 5),
      ];
      houseStage.setStagePlayers();
      expect(houseStage.stagePlayers.length).toEqual(1);
    });

    it('should set two player', () => {
      SettingService.LEVEL = 2;
      PlayerService.setOrder();
      houseStage.stagePlayers = [
        new Player(1, 'One', 100),
        new Player(2, 'Two', 10),
        new Player(3, 'Three', 30),
      ];
      houseStage.setStagePlayers();
      expect(houseStage.stagePlayers.length).toEqual(2);
    });

    it('should set no player', () => {
      PlayerService.setOrder();
      houseStage.stagePlayers = [];
      houseStage.setStagePlayers();
      expect(houseStage.stagePlayers.length).toEqual(0);
    });
  });

  describe('getCurrentPlayer', () => {
    beforeEach(function() {
      PlayerService.setOrder();
      houseStage.stagePlayers = [
        new Player(1, 'One'),
        new Player(2, 'Two')
      ];
      houseStage.setStagePlayers();
    });

    it('should return current player', () => {
      const player = houseStage.getCurrentPlayer();
      expect(player).toEqual(houseStage.stagePlayers[0]);
    });

    it('should throw an error', () => {
      houseStage.removePlayer();
      houseStage.removePlayer();
      expect(() => houseStage.getCurrentPlayer()).toThrow();
    });
  });

  describe('removePlayer', () => {
    beforeEach(function() {
      PlayerService.setOrder();
      houseStage.stagePlayers = [
        new Player(1, 'One'),
        new Player(2, 'Two')
      ];
      houseStage.setStagePlayers();
    });

    it('should remove player', () => {
      expect(houseStage.stagePlayers.length).toEqual(2);
      houseStage.removePlayer();
      expect(houseStage.stagePlayers.length).toEqual(1);
    });

    it('should throw an error', () => {
      houseStage.removePlayer();
      houseStage.removePlayer();
      expect(() => houseStage.removePlayer()).toThrow();
    });
  });

  describe('isStageFinished', () => {
    beforeEach(function() {
      PlayerService.setOrder();
      houseStage.stagePlayers = PlayerService.getPlayersAscending();
    });

    it('should should return false', () => {
      expect(houseStage.isStageFinished()).toBeFalsy();
      houseStage.removePlayer();
      expect(houseStage.isStageFinished()).toBeFalsy();
      houseStage.removePlayer();
      expect(houseStage.isStageFinished()).toBeFalsy();
      houseStage.removePlayer();
      expect(houseStage.isStageFinished()).toBeFalsy();
    });

    it('should should return true', () => {
      houseStage.removePlayer();
      houseStage.removePlayer();
      houseStage.removePlayer();
      houseStage.removePlayer();
      expect(houseStage.isStageFinished()).toBeTruthy();
    });

    it('should throw an error', () => {
      houseStage.removePlayer();
      houseStage.removePlayer();
      houseStage.removePlayer();
      houseStage.removePlayer();
      expect(() => houseStage.removePlayer()).toThrow();
    });
  });
});
