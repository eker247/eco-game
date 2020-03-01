"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var player_mock_1 = require("./player.mock");
var PlayerService = /** @class */ (function () {
    function PlayerService() {
    }
    PlayerService.getPlayersAscending = function () {
        var _this = this;
        return Object.keys(this.orderedPlayers).map(function (key) { return _this.orderedPlayers[key]; });
    };
    PlayerService.getPlayersDescending = function () {
        var _this = this;
        var descending = Object.keys(this.orderedPlayers).sort(function (a, b) { return Number.parseInt(b) - Number.parseFloat(a); });
        return descending.map(function (key) { return _this.orderedPlayers[Number.parseInt(key)]; });
    };
    PlayerService.setOrder = function () {
        var _this = this;
        var order = 0;
        this.orderedPlayers = {};
        this.players.forEach(function (player) {
            // count houses
            order += player.houses.length << 24;
            // price of most expensive station
            order +=
                Math.max.apply(Math, player.stations.map(function (station) { return station.price; })) << 16;
            // cash
            order += player.cash << 4;
            // player id
            order += player.id;
            _this.orderedPlayers[order] = player;
        });
    };
    PlayerService.setPlayers = function (players) {
        this.players = __spreadArrays(players);
    };
    PlayerService.isGameOver = function () {
        return this.players.some(function (player) { return player.houses.length > 10; });
    };
    PlayerService.players = player_mock_1.PlayerMock.getNPlayers(4);
    PlayerService.orderedPlayers = {};
    return PlayerService;
}());
exports.PlayerService = PlayerService;
