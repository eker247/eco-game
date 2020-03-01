"use strict";
exports.__esModule = true;
var setting_service_1 = require("../setting.service");
var Player = /** @class */ (function () {
    function Player(id, name, cash) {
        if (cash === void 0) { cash = setting_service_1.SettingService.STARTING_CASH; }
        this.stations = [];
        this.houses = [];
        this.resources = {};
        this.id = id;
        this.name = name;
        this.cash = cash;
    }
    Player.prototype.earn = function (cash) {
        if (!cash || typeof cash !== 'number' || cash < 1) {
            throw new Error('Player.earn - Incorrect value');
        }
        this.cash += cash;
    };
    Player.prototype.spend = function (cash) {
        if (!cash || typeof cash !== 'number' || cash < 1) {
            throw new Error('Player.spend - Incorrect value');
        }
        else if (cash > this.cash) {
            throw new Error('Player.spend - No enough cash');
        }
        else {
            this.cash -= cash;
        }
    };
    Player.prototype.addStation = function (newStation) {
        if (!newStation) {
            throw new Error("Player.addStation - Adding station is incorrect " + newStation);
        }
        else if (this.stations.some(function (station) { return station.id === newStation.id; })) {
            throw new Error("Player.addStation - Player already has station " + newStation);
        }
        this.stations.push(newStation);
    };
    Player.prototype.removeStation = function (stationToRemove) {
        if (!stationToRemove) {
            throw new Error('Player.removeStation - Incorrect station');
        }
        else if (!this.stations.some(function (station) { return station.id === stationToRemove.id; })) {
            throw new Error('Player.removeStation - Player has not this station');
        }
        this.stations = this.stations.filter(function (localStation) { return localStation !== stationToRemove; });
    };
    Player.prototype.addHouse = function (newHouse) {
        if (!newHouse) {
            throw new Error('Player.addHouse - House incorrect');
        }
        else if (this.houses.some(function (house) { return house.id === newHouse.id; })) {
            throw new Error('Player.addHouse - House already exist');
        }
        this.houses.push(newHouse);
    };
    return Player;
}());
exports.Player = Player;
