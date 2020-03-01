"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var setting_service_1 = require("../../setting.service");
var HouseService = /** @class */ (function () {
    function HouseService() {
    }
    HouseService.putHousesOnMap = function () {
        this.housesOnMap = [];
        var numberOfHouses = setting_service_1.SettingService.NUMBER_OF_PLAYERS * setting_service_1.SettingService.HOUSES_PER_PLAYER;
        var houseId = 1;
        var houseCoordinates = {};
        while (houseId <= numberOfHouses) {
            var house = {
                id: houseId,
                axisX: Math.floor(Math.random() * setting_service_1.SettingService.BOARD_WIDTH),
                axisY: Math.floor(Math.random() * setting_service_1.SettingService.BOARD_HEIGHT),
                players: []
            };
            var key = house.axisX + "," + house.axisY;
            if (!houseCoordinates[key]) {
                this.housesOnMap.push(house);
                houseCoordinates[key] = true;
                ++houseId;
            }
        }
    };
    HouseService.getHouses = function () {
        return this.housesOnMap;
    };
    HouseService.buyFirstHouse = function (player, house) {
        if ((player.houses || []).length) {
            throw new Error('HS.buyFirstHouse - Player already has some houses');
        }
        else if ((house.players || []).length) {
            throw new Error('HS.buyFirstHouse - House already has owner');
        }
        else if (player.cash < setting_service_1.SettingService.HOUSE_BASIC_PRICE) {
            throw new Error('HS.buyFirstHouse - Player has no enough cash');
        }
        house.players = [player];
        player.houses = __spreadArrays((player.houses || []), [house]);
        player.cash -= setting_service_1.SettingService.HOUSE_BASIC_PRICE;
    };
    HouseService.getHousePrice = function (player, pathToHouse) {
        if ((pathToHouse || []).length < 2) {
            throw new Error('HS.getHousePrice - Path has to be defined');
        }
        else if (!pathToHouse[0].players.some(function (pathPlayer) { return pathPlayer.id === player.id; })) {
            throw new Error("HS.getHousePrice - Have to start from player's house");
        }
        var lastHouse = pathToHouse[pathToHouse.length - 1];
        if (lastHouse.players.some(function (pathPlayer) { return pathPlayer.id === player.id; })) {
            throw new Error('HS.getHousePrice - Player already posses this house');
        }
        else if ((lastHouse.players || []).length >= setting_service_1.SettingService.LEVEL ||
            (lastHouse.players || []).length >= setting_service_1.SettingService.HOUSE_MAX_OWNERS) {
            throw new Error('HS.getHousePrice - There is no possibility to put new player to this house yet');
        }
        var distancePrice = 0;
        var pathLength = pathToHouse.length;
        for (var i = 1; i < pathLength; ++i) {
            distancePrice += this.computeDistancePrice(pathToHouse[i - 1], pathToHouse[i]);
        }
        var housePrice = setting_service_1.SettingService.HOUSE_BASIC_PRICE +
            (lastHouse.players || []).length * setting_service_1.SettingService.HOUSE_EXTRA_PRICE;
        return housePrice + distancePrice;
    };
    HouseService.computeDistancePrice = function (start, end) {
        var distance = Math.sqrt(Math.pow(start.axisX - end.axisX, 2) +
            Math.pow(start.axisY - end.axisY, 2));
        return Math.floor(Math.pow(distance / setting_service_1.SettingService.HOUSE_PRICE_DIVISOR, 2));
    };
    HouseService.buyNextHouse = function (player, pathToHouse) {
        var price = this.getHousePrice(player, pathToHouse);
        var house = pathToHouse[pathToHouse.length - 1];
        if (player.cash < price) {
            throw new Error('HS.buyStation - Player has no enough cash');
        }
        house.players = __spreadArrays((house.players || []), [player]);
        player.houses = __spreadArrays((player.houses || []), [house]);
        player.cash -= price;
        this.promoteLevel(player.houses.length);
    };
    HouseService.promoteLevel = function (housesNumber) {
        var level = 1 + Math.floor(housesNumber / setting_service_1.SettingService.HOUSES_TO_PROMOTE_LEVEL);
        if (level > setting_service_1.SettingService.LEVEL) {
            setting_service_1.SettingService.LEVEL = level;
        }
    };
    return HouseService;
}());
exports.HouseService = HouseService;
