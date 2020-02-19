import { ResourceEnum } from '../stages/resource/resource.enum';
import { Station } from '../stages/station/station';
import { Player } from './player';
import { PlayerError } from './player.error';
import { House } from '../house';

const PLAYER_NAME = 'adin';
const DEFAULT_CASH = 200;

describe('Player.spec.ts', () => {
  let player: Player;

  beforeEach(() => {
    player = new Player(1, PLAYER_NAME, DEFAULT_CASH);
  });

  it('should create a new player', () => {
    expect(player).toBeTruthy();
    expect(player.name).toEqual(PLAYER_NAME);
    expect(player.cash).toEqual(DEFAULT_CASH);
    expect(player.id).toEqual(1);
  });

  describe('earn method', () => {
    it('should add a 100', () => {
      player.earn(100);
      expect(player.cash).toEqual(DEFAULT_CASH + 100);
    });

    it('should throw an error', () => {
      const cash = -200;
      expect(() => player.earn(cash)).toThrow(
        PlayerError.CASH_INCORRECT_VALUE(cash)
      );
      expect(() => player.earn(0)).toThrow(PlayerError.CASH_INCORRECT_VALUE(0));
      expect(() => player.earn(null)).toThrow(
        PlayerError.CASH_INCORRECT_VALUE(null)
      );
    });
  });

  describe('spend method', () => {
    it('should subtract 50', () => {
      player.spend(50);
      expect(player.cash).toEqual(DEFAULT_CASH - 50);
    });

    it('should throw an error', () => {
      const tooMuch = DEFAULT_CASH + 1;
      expect(() => player.spend(tooMuch)).toThrow(
        PlayerError.CASH_NO_ENOUGH(tooMuch, player.cash)
      );
      expect(() => player.spend(null)).toThrow(
        PlayerError.CASH_INCORRECT_VALUE(null)
      );
      expect(() => player.spend(0)).toThrow(
        PlayerError.CASH_INCORRECT_VALUE(0)
      );
    });
  });

  describe('addStation method', () => {
    const station: Station = {
      id: 0,
      level: 0,
      price: 3,
      name: 'Oil Station 1',
      resource: ResourceEnum.OIL,
      resourceConsumption: 2,
      efficiency: 1
    } as Station;

    it('should add station', () => {
      expect(() => player.addStation(station)).not.toThrow();
      expect(player.stations.length).toBeGreaterThanOrEqual(1);
    });

    it('should throw an error', () => {
      expect(() => {
        player.addStation(station);
        player.addStation(station);
      }).toThrow(PlayerError.STATION_ALREADY_ADDED(station));
      expect(() => player.addStation(null)).toThrow(
        PlayerError.STATION_INCORRECT(null)
      );
    });
  });

  describe('removeStation method', () => {
    const station: Station = {
      id: 0,
      level: 0,
      price: 3,
      name: 'Oil Station 1',
      resource: ResourceEnum.OIL,
      resourceConsumption: 2,
      efficiency: 1
    } as Station;

    it('should throw an error', () => {
      expect(() => player.removeStation(null)).toThrow(
        PlayerError.STATION_INCORRECT(null)
      );
      expect(() => player.removeStation(station)).toThrow(
        PlayerError.PLAYER_HAS_NOT_STATION(station)
      );
    });

    it('should remove station', () => {
      const station: Station = {
        id: 0,
        level: 0,
        price: 3,
        name: 'Oil Station 1',
        resource: ResourceEnum.OIL,
        resourceConsumption: 2,
        efficiency: 1
      } as Station;
      player.stations.push(station);
      expect(player.stations.length).toEqual(1);
      player.removeStation(station);
      expect(player.stations.length).toEqual(0);
    });
  });

  describe('addHouse method', () => {
    const house: House = {
      id: 1,
      axisX: 3,
      axisY: 4,
      player: player,
    } as House;

    it('should add a house', () => {
      player.addHouse(house);
      expect(player.houses.length).toEqual(1);
      expect(player.houses[0]).toEqual(house);
    });

    it('should throw an error', () => {
      expect(() => player.addHouse(null)).toThrow(
        PlayerError.HOUSE_INCORRECT(null)
      );
    });
  });
});
