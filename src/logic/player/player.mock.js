"use strict";
exports.__esModule = true;
var get_stations_1 = require("../../logic/stages/station/get-stations");
var player_1 = require("./player");
var CASH = 100;
var PlayerMock = /** @class */ (function () {
    function PlayerMock() {
    }
    PlayerMock.getNPlayers = function (numberOfPlayers) {
        var _this = this;
        if (numberOfPlayers === void 0) { numberOfPlayers = 4; }
        this.players.forEach(function (player) {
            var n = 3 * player.id;
            player.houses = [
                { id: n, axisX: n, axisY: n },
                { id: n + 1, axisX: n + 1, axisY: n + 1 },
                { id: n + 2, axisX: n + 2, axisY: n + 2 }
            ];
            player.stations = [_this.stations[player.id]];
            player.resources[player.stations[0].resource] = player.id % 4 + 2;
        });
        return this.players.slice(0, numberOfPlayers);
    };
    PlayerMock.players = [
        new player_1.Player(1, 'Player One', CASH),
        new player_1.Player(2, 'Player Two', CASH),
        new player_1.Player(3, 'Player Three', CASH),
        new player_1.Player(4, 'Player Four', CASH),
        new player_1.Player(5, 'Player Five', CASH),
        new player_1.Player(6, 'Player Six', CASH),
        new player_1.Player(7, 'Player Seven', CASH),
        new player_1.Player(8, 'Player Eight', CASH)
    ];
    PlayerMock.stations = get_stations_1.getStations();
    return PlayerMock;
}());
exports.PlayerMock = PlayerMock;
