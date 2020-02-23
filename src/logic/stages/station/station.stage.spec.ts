import { Player } from '../../player/player';
import { Station } from './station';
import { StationService } from './station.service';
import { StationStage } from './station.stage';

describe('station.stage.spec.ts', () => {
  let players: Player[];
  let stage: StationStage;

  beforeEach(() => {
    players = [
      new Player(1, 'One', 100),
      new Player(2, 'Two', 100),
      new Player(3, 'Three', 100),
      new Player(4, 'Four', 100)
    ];
    stage = new StationStage();
    stage.stagePlayers = players;
  });

  describe('setStagePlayers', () => {
    it('should add all players', () => {
      expect(stage.stagePlayers.length).toEqual(4);
    });

    it('should add some players', () => {
      stage.stagePlayers = players;
      players[3].cash = 2;
      stage.setStagePlayers();
      expect(stage.stagePlayers.length).toEqual(3);
    });
  });

  describe('getMostExpensiveStationPrice', () => {
    it('should find the most expensive station', () => {
      const stations = [
        { price: 10 },
        { price: 4 },
        { price: 26 },
        { price: 14 }
      ] as Station[];
      const price = stage.getMostExpensiveStationPrice(stations);
      expect(price).toEqual(26);
    });

    it('should throw an error', () => {
      expect(() => stage.getMostExpensiveStationPrice(null)).toThrow();
    });
  });

  describe('getCurrentPlayer', () => {
    it('should return the player', () => {
      stage.stagePlayers = players;
      const player = stage.getCurrentPlayer();
      expect(player).toBeTruthy();
      expect(player).toEqual(players[0]);
    });

    it('should throw an error', () => {
      stage.stagePlayers = [];
      expect(() => stage.getCurrentPlayer()).toThrow();
    });
  });

  describe('getStationsToBuy', () => {
    it('should return stations', () => {
      spyOn(StationService, 'getCurrentStations').and.returnValue([
        { name: 'coal' } as Station
      ]);
      const stations = stage.getStationsToBuy();
      expect(stations.length).toEqual(1);
    });
  });

  describe('getNextStations', () => {
    it('should return stations', () => {
      spyOn(StationService, 'getNextStations').and.returnValue([
        { name: 'coal' } as Station
      ]);
      const stations = stage.getNextStations();
      expect(stations.length).toEqual(1);
    });
  });

  describe('setActualStation', () => {
    const station = { id: 4, price: 10 } as Station;
    const player = { name: 'testPlayer', cash: 20 } as Player;

    it('should set actual station', () => {
      stage.setActualStation(station, player);
      expect(stage.actualStation).toEqual(station);
      expect(stage.playerWithHighestWage).toEqual(player);
      expect(stage.actualPrice).toEqual(station.price);
    });

    it('should set custom price', () => {
      stage.setActualStation(station, player, 20);
      expect(stage.actualPrice).toEqual(20);
    });

    it('should throw an error (user already added)', () => {
      stage.setActualStation(station, player);
      expect(() => stage.setActualStation(station, player)).toThrow();
    });

    it('should throw an error (wrong parameters)', () => {
      expect(() => stage.setActualStation(station, player, 100)).toThrow();
      expect(() => stage.setActualStation(station, player, 2)).toThrow();
      expect(() => stage.setActualStation(station, null)).toThrow();
      expect(() => stage.setActualStation(null, player)).toThrow();
    });
  });

  describe('outbidAuction', () => {
    beforeEach(() => {
      const station = { id: 4, price: 10 } as Station;
      const player = { id: 1, name: 'playerOne', cash: 20 } as Player;
      stage.setActualStation(station, player);
    });

    it('should outbid current price', () => {
      const player = { id: 2, name: 'playerTwo', cash: 30 } as Player;
      stage.outbidAuction(player, 11);
      expect(stage.actualPrice).toEqual(11);
      expect(stage.playerWithHighestWage).toEqual(player);
    });

    it('should throw an error', () => {
      expect(() =>
        stage.outbidAuction(
          { id: 2, name: 'playerThree', cash: 30 } as Player,
          10
        )
      ).toThrow();
      expect(() =>
        stage.outbidAuction(
          { id: 2, name: 'playerFour', cash: 30 } as Player,
          9
        )
      ).toThrow();
      expect(() =>
        stage.outbidAuction(
          { id: 2, name: 'playerThree', cash: 10 } as Player,
          11
        )
      ).toThrow();
    });
  });

  describe('buyStation', () => {
    let station: Station;
    let player: Player;

    beforeEach(() => {
      stage = new StationStage();
      stage.stagePlayers = players;
      player = stage.stagePlayers[0];
      player.cash = 15;
      station = { id: 4, price: 10 } as Station;
      stage.setActualStation(station, player);
      stage.buyStation();
    });

    it('should update player', () => {
      expect(player.stations.length).toEqual(1);
      expect(player.cash).toEqual(5);
    });

    it('should update stage properties', () => {
      expect(stage.actualStation).toBeNull();
      expect(stage.playerWithHighestWage).toBeNull();
      expect(stage.stagePlayers.length).toEqual(3);
    });
  });

  describe('removePlayerAbleToBuy', () => {
    it('should remove player from array', () => {
      const lengthBeforeRemove = stage.stagePlayers.length;
      stage.removeCurrentPlayer(stage.stagePlayers[0]);
      expect(stage.stagePlayers.length).toEqual(lengthBeforeRemove - 1);
    });

    it('should throw an error', () => {
      expect(() => stage.removeCurrentPlayer(null)).toThrow();
    });
  });

  describe('removeStation', () => {
    beforeEach(() => {
      const station = { id: 4, price: 10 } as Station;
      const player = players[0];
      stage = new StationStage();
      stage.setActualStation(station, player, 15);
      spyOn(StationService, 'removeStation');
      stage.removeStation();
    });

    it('should set stage properties', () => {
      expect(stage.actualStation).toBeNull();
      expect(stage.actualPrice).toEqual(0);
    });

    it('should throw an error', () => {
      expect(() => {
        stage.removeStation();
      }).toThrow();
    });
  });

  describe('isStageFinished', () => {
    it('should return false', () => {
      stage.stagePlayers = players;
      expect(stage.isStageFinished()).toBeFalsy();
    });

    it('should return true', () => {
      stage.stagePlayers = [];
      expect(stage.isStageFinished()).toBeTruthy();
    });
  });
});
