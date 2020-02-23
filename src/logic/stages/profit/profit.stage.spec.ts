import { ProfitStage } from './profit.stage';
import { Station } from '../station';
import { ResourceEnum } from '../resource/resource.enum';
import { PlayerService } from '../../player';
import { SettingService } from '../../setting.service';

describe('profit.stage.spec', () => {
  let profitStage: ProfitStage;

  beforeEach(function() {
    PlayerService.setOrder();
    profitStage = new ProfitStage();
  });

  describe('makeProfit', () => {
    it('should make profit', () => {
      SettingService.PROFIT_BASE = 12;
      SettingService.PROFIT_EXTRA = 9;
      const station: Station = {
        id: 1,
        level: 1,
        price: 1,
        name: 'Test Station',
        resource: ResourceEnum.COAL,
        resourceConsumption: 3,
        efficiency: 2,
      }
      const player = profitStage.getCurrentPlayer();
      player.stations = [station];
      player.resources[ResourceEnum.COAL] = 4;
      profitStage.makeProfit([station]);
      expect(player.cash).toEqual(130);
    });

    it('should throw an error', () => {
      SettingService.PROFIT_BASE = 12;
      SettingService.PROFIT_EXTRA = 9;
      const station: Station = {
        id: 1,
        level: 1,
        price: 1,
        name: 'Test Station',
        resource: ResourceEnum.COAL,
        resourceConsumption: 3,
        efficiency: 2,
      }
      const player = profitStage.getCurrentPlayer();
      player.stations = [station];
      player.resources[ResourceEnum.COAL] = 1;
      expect(() => profitStage.makeProfit(null)).toThrow();
      expect(() => profitStage.makeProfit([station])).toThrow();
    })

  });
});
