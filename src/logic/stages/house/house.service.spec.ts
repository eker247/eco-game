import { Player } from '../../player';
import { SettingService } from '../../setting.service';
import { House } from './house';
import { HouseService } from './house.service';

describe('house.service.spec', () => {
  describe('putHousesOnMap', () => {
    it('should set 60 houses', () => {
      SettingService.HOUSES_PER_PLAYER = 15;
      SettingService.NUMBER_OF_PLAYERS = 4;
      HouseService.putHousesOnMap();
      expect(HouseService.housesOnMap.length).toEqual(60);
    });

    it('should set 40 houses', () => {
      SettingService.HOUSES_PER_PLAYER = 20;
      SettingService.NUMBER_OF_PLAYERS = 2;
      HouseService.putHousesOnMap();
      expect(HouseService.housesOnMap.length).toEqual(40);
    });
  });

  describe('getHouses', () => {
    beforeEach(function() {
      SettingService.HOUSES_PER_PLAYER = 15;
      SettingService.NUMBER_OF_PLAYERS = 4;
      HouseService.putHousesOnMap();
    });

    it('should return 60 houses', () => {
      const houses = HouseService.getHouses();
      expect(houses.length).toEqual(60);
    });
  });

  describe('buyFirstHouse', () => {
    let houses: House[];
    let player: Player;

    beforeEach(function() {
      SettingService.HOUSES_PER_PLAYER = 15;
      SettingService.NUMBER_OF_PLAYERS = 4;
      HouseService.putHousesOnMap();
      houses = HouseService.getHouses();
      player = new Player(1, 'One', 100);
    });

    it("should add player's house", () => {
      HouseService.buyFirstHouse(player, houses[0]);
      expect(player.houses).toContain(houses[0]);
      expect(player.houses.length).toEqual(1);
      expect(player.cash).toBeLessThan(100);
      expect(houses[0].players).toContain(player);
    });

    it('should throw an error', () => {
      expect(() => HouseService.buyFirstHouse(null, houses[1])).toThrow();
      expect(() => HouseService.buyFirstHouse(player, null)).toThrow();
      HouseService.buyFirstHouse(player, houses[0]);
      expect(() => HouseService.buyFirstHouse(player, houses[0])).toThrow();
      expect(() => HouseService.buyFirstHouse(player, houses[0])).toThrow();
    });
  });

  describe('getHousePrice', () => {
    let houses: House[];
    let player: Player;

    beforeEach(function() {
      SettingService.HOUSES_PER_PLAYER = 15;
      SettingService.NUMBER_OF_PLAYERS = 4;
      HouseService.putHousesOnMap();
      houses = HouseService.getHouses();
      player = new Player(1, 'One', 100);
      houses[0] = { id: 1, axisX: 0, axisY: 0, players: [] } as House;
      houses[1] = { id: 2, axisX: 3, axisY: 4, players: [] } as House;
      houses[2] = { id: 3, axisX: 6, axisY: 8, players: [] } as House;
    });

    it('should throw an error', () => {
      expect(() =>
        HouseService.getHousePrice(player, [houses[0], houses[1]])
      ).toThrow();
    });

    it('should return house price', () => {
      HouseService.buyFirstHouse(player, houses[0]);
      const price1 = HouseService.getHousePrice(player, [houses[0], houses[1]]);
      const price2 = HouseService.getHousePrice(player, [
        houses[0],
        houses[1],
        houses[2]
      ]);
      const price3 = HouseService.getHousePrice(player, [houses[0], houses[2]]);
      expect(price1).toEqual(16);
      expect(price2).toEqual(22);
      expect(price3).toEqual(35);
    });
  });

  describe('buyStation', () => {
    let houses: House[];
    let player: Player;

    beforeEach(function() {
      SettingService.HOUSES_PER_PLAYER = 15;
      SettingService.NUMBER_OF_PLAYERS = 4;
      HouseService.putHousesOnMap();
      houses = HouseService.getHouses();
      player = new Player(1, 'One', 100);
      houses[0] = { id: 1, axisX: 0, axisY: 0, players: [] } as House;
      houses[1] = { id: 2, axisX: 3, axisY: 4, players: [] } as House;
      houses[2] = { id: 3, axisX: 6, axisY: 8, players: [] } as House;
    });

    it('should throw an error', () => {
      expect(() =>
        HouseService.buyNextHouse(player, [houses[0], houses[0]])
      ).toThrow();
      expect(() =>
        HouseService.buyNextHouse(player, [houses[0], houses[1]])
      ).toThrow();
      HouseService.buyFirstHouse(player, houses[0]);
      expect(() =>
        HouseService.buyNextHouse(player, [houses[0], houses[0]])
      ).toThrow();
    });

    it('should buy a house', () => {
      HouseService.buyFirstHouse(player, houses[0]);
      HouseService.buyNextHouse(player, [houses[0], houses[1], houses[2]]);
      expect(player.houses).toContain(houses[0]);
      expect(player.houses).toContain(houses[2]);
      expect(player.houses).not.toContain(houses[1]);
      expect(player.cash).toEqual(68);
      expect(houses[0].players).toContain(player);
      expect(houses[2].players).toContain(player);
      expect(houses[1].players).not.toContain(player);
      expect(player.houses.length).toEqual(2);
    });
  });

  describe('promoteLevel', () => {
    it('should stay on 1st level', () => {
      SettingService.LEVEL = 1;
      SettingService.HOUSES_TO_PROMOTE_LEVEL = 7;
      HouseService.promoteLevel(0);
      HouseService.promoteLevel(2);
      HouseService.promoteLevel(6);
      expect(SettingService.LEVEL).toEqual(1);
    });

    it('should promote to 2nd level', () => {
      SettingService.LEVEL = 1;
      SettingService.HOUSES_TO_PROMOTE_LEVEL = 7;
      HouseService.promoteLevel(7);
      expect(SettingService.LEVEL).toEqual(2);
      HouseService.promoteLevel(3);
      HouseService.promoteLevel(8);
      HouseService.promoteLevel(0);
      expect(SettingService.LEVEL).toEqual(2);
    });

    it('should promote to 3rd level', () => {
      SettingService.LEVEL = 1;
      SettingService.HOUSES_TO_PROMOTE_LEVEL = 3;
      HouseService.promoteLevel(6);
      expect(SettingService.LEVEL).toEqual(3);
    });
  });
});
