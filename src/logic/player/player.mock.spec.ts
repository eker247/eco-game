import { PlayerMock } from './player.mock';

describe('player.mock.spec.ts', () => {
  it('Test', () => {
    expect(PlayerMock.getNPlayers(4)).toEqual([
      {
        cash: 100,
        houses: [
          { axisX: 3, axisY: 3, id: 3 },
          { axisX: 4, axisY: 4, id: 4 },
          { axisX: 5, axisY: 5, id: 5 }
        ],
        id: 1,
        name: 'Player One',
        resources: { Coal: 3 },
        stations: [
          {
            efficiency: 1,
            id: 1,
            level: 0,
            name: 'Carbon Station 1',
            price: 4,
            resource: 'Coal',
            resourceConsumption: 2
          }
        ]
      },
      {
        cash: 100,
        houses: [
          { axisX: 6, axisY: 6, id: 6 },
          { axisX: 7, axisY: 7, id: 7 },
          { axisX: 8, axisY: 8, id: 8 }
        ],
        id: 2,
        name: 'Player Two',
        resources: { Trash: 4 },
        stations: [
          {
            efficiency: 1,
            id: 2,
            level: 0,
            name: 'Trash Station 1',
            price: 5,
            resource: 'Trash',
            resourceConsumption: 2
          }
        ]
      },
      {
        cash: 100,
        houses: [
          { axisX: 9, axisY: 9, id: 9 },
          { axisX: 10, axisY: 10, id: 10 },
          { axisX: 11, axisY: 11, id: 11 }
        ],
        id: 3,
        name: 'Player Three',
        resources: { Oil: 5 },
        stations: [
          {
            efficiency: 2,
            id: 3,
            level: 1,
            name: 'OIL Station 2',
            price: 7,
            resource: 'Oil',
            resourceConsumption: 3
          }
        ]
      },
      {
        cash: 100,
        houses: [
          { axisX: 12, axisY: 12, id: 12 },
          { axisX: 13, axisY: 13, id: 13 },
          { axisX: 14, axisY: 14, id: 14 }
        ],
        id: 4,
        name: 'Player Four',
        resources: { Coal: 2 },
        stations: [
          {
            efficiency: 2,
            id: 4,
            level: 1,
            name: 'Carbon Station 2',
            price: 8,
            resource: 'Coal',
            resourceConsumption: 3
          }
        ]
      }
    ]);
  });
});
