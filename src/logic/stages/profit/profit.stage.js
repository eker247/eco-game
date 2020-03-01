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
var setting_service_1 = require("../../setting.service");
var stage_1 = require("../stage");
var ProfitStage = /** @class */ (function (_super) {
    __extends(ProfitStage, _super);
    function ProfitStage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProfitStage.prototype.setStagePlayers = function () {
        this.stagePlayers = this.stagePlayers.filter(function (player) {
            return (player.stations || []).some(function (station) {
                return ((player.resources || {})[station.resource] || 0) >=
                    station.resourceConsumption;
            });
        });
    };
    ProfitStage.prototype.makeProfit = function (stations) {
        var player = this.getCurrentPlayer();
        var profit = this.computeProfit(stations);
        player.cash += profit;
        stations.forEach(function (station) {
            player.resources[station.resource] -= station.resourceConsumption;
        });
        return profit;
    };
    ProfitStage.prototype.computeProfit = function (stations) {
        var player = this.getCurrentPlayer();
        var houseForProfit = 0;
        stations.forEach(function (station) {
            if (((player.resources || {})[station.resource] || 0) <
                station.resourceConsumption) {
                throw new Error("ProfitSt.makeProfit - Player has no enough " + station.resource);
            }
            houseForProfit += station.efficiency;
        });
        var effectiveHouses = houseForProfit < player.houses.length
            ? houseForProfit
            : player.houses.length;
        var profit = setting_service_1.SettingService.PROFIT_BASE +
            effectiveHouses * setting_service_1.SettingService.PROFIT_EXTRA;
        return profit;
    };
    return ProfitStage;
}(stage_1.Stage));
exports.ProfitStage = ProfitStage;
