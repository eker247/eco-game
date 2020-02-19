import { PlayerMock } from './player.mock';
import { PlayerService } from './player.service';

describe('player.PlayerService.spec.ts', () => {
  beforeEach(() => {
    PlayerService.setPlayers(PlayerMock.getNPlayers(4));
  });

  describe('setOrder', () => {
    it('should have not order', () => {
      expect(PlayerService.orderedPlayers).toEqual({});
    });

    it('should set order', () => {
      PlayerService.setOrder();
      expect(PlayerService.orderedPlayers).toBeTruthy();
      expect(Object.keys(PlayerService.orderedPlayers).length).toEqual(4);
    });
  });

  describe('getPlayersAscending', () => {
    beforeEach(function() {
      PlayerService.setOrder();
    });

    it('should get players in proper order', () => {
      expect(PlayerService.getPlayersAscending().map(player => player.name)).toEqual([
        'Player One',
        'Player Two',
        'Player Three',
        'Player Four'
      ]);
    });
  });

  describe('getPlayersDescending', () => {
    beforeEach(function() {
      PlayerService.setOrder();
    });

    it('should get players in proper order', () => {
      expect(
        PlayerService.getPlayersDescending().map(player => player.name)
      ).toEqual(['Player Four', 'Player Three', 'Player Two', 'Player One']);
    });
  });
});
