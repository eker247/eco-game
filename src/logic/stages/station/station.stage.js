"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var player_service_1 = require("../../player/player.service");
var stage_1 = require("../stage");
var station_service_1 = require("./station.service");
var StationStage = /** @class */ (function (_super) {
    __extends(StationStage, _super);
    function StationStage() {
        var _this = _super.call(this) || this;
        _this.stagePlayers = player_service_1.PlayerService.getPlayersDescending();
        _this.stagePlayers = player_service_1.PlayerService.getPlayersDescending();
        _this.setStagePlayers();
        return _this;
    }
    StationStage.prototype.setStagePlayers = function () {
        var lowestStationPrice = station_service_1.StationService.getCheapestStationPrice();
        this.stagePlayers = this.stagePlayers.filter(function (player) { return player.cash >= lowestStationPrice; });
    };
    StationStage.prototype.getMostExpensiveStationPrice = function (stations) {
        if (!stations) {
            throw new Error('StatSt.getMostExpensiveStationPrice - Incorrect stations');
        }
        var price = 0;
        stations.forEach(function (station) {
            if (station.price > price) {
                price = station.price;
            }
        });
        return price;
    };
    StationStage.prototype.getCurrentPlayer = function () {
        if (this.stagePlayers.length < 1) {
            throw new Error('There is no players able to buy a station');
        }
        return this.stagePlayers[0];
    };
    StationStage.prototype.getStationsToBuy = function () {
        return station_service_1.StationService.getCurrentStations();
    };
    StationStage.prototype.getNextStations = function () {
        return station_service_1.StationService.getNextStations();
    };
    StationStage.prototype.setActualStation = function (station, player, price) {
        if (price === void 0) { price = 0; }
        if (!station) {
            throw new Error('StatSt.setActualStation - Station incorrect');
        }
        else if (this.actualStation) {
            throw new Error('StatSt.setActualStation - Station already set');
        }
        else if (!player) {
            throw new Error('StatSt.setActualStation - Player incorrect');
        }
        else if (this.playerWithHighestWage &&
            this.playerWithHighestWage.id === player.id) {
            throw new Error('StatSt.setActualStation - Player the same');
        }
        else if (price && price < station.price) {
            throw new Error('StatSt.setActualStation - Price incorrect');
        }
        else if (price > player.cash) {
            throw new Error('StatSt.setActualStation - No enough cash');
        }
        this.actualStation = station;
        this.playerWithHighestWage = player;
        this.actualPrice = price > station.price ? price : station.price;
    };
    StationStage.prototype.outbidAuction = function (player, price) {
        if (!player) {
            throw new Error('StatSt.outbidAuction - Player incorrect');
        }
        else if (!price) {
            throw new Error('StatSt.outbidAuction - Price incorrect');
        }
        else if (this.playerWithHighestWage === player) {
            throw new Error('StatSt.outbidAuction - Player the same');
        }
        else if (price <= this.actualPrice) {
            throw new Error('StatSt.outbidAuction - Price to low');
        }
        else if (player.cash < price) {
            throw new Error('StatSt.outbidAuction - Price no enough');
        }
        this.actualPrice = price;
        this.playerWithHighestWage = player;
    };
    StationStage.prototype.buyStation = function () {
        this.playerWithHighestWage.addStation(this.actualStation);
        this.playerWithHighestWage.spend(this.actualPrice);
        this.removeStation();
        this.removeCurrentPlayer();
        this.playerWithHighestWage = null;
    };
    StationStage.prototype.removeCurrentPlayer = function () {
        var _this = this;
        if (!this.playerWithHighestWage) {
            throw new Error('StatSt.removePlayerAbleToBuy - Player incorrect');
        }
        this.stagePlayers = this.stagePlayers.filter(function (player) { return player !== _this.playerWithHighestWage; });
    };
    StationStage.prototype.removeStation = function () {
        if (!this.actualStation) {
            throw new Error('StatSt.removeStations - No actual station');
        }
        station_service_1.StationService.removeStation(this.actualStation.id);
        this.actualStation = null;
        this.actualPrice = 0;
    };
    return StationStage;
}(stage_1.Stage));
exports.StationStage = StationStage;
