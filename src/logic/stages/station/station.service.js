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
var get_stations_1 = require("./get-stations");
var StationService = /** @class */ (function () {
    function StationService() {
    }
    StationService.getStations = function () {
        return this.stations.slice(0, 8);
    };
    StationService.removeStation = function (id) {
        this.stations = this.stations.filter(function (oldStation) { return oldStation.id !== id; });
    };
    StationService.getCurrentStations = function () {
        return setting_service_1.SettingService.LEVEL < setting_service_1.SettingService.CRITIC_LEVEL
            ? this.stations.slice(0, setting_service_1.SettingService.STATIONS_PART)
            : this.stations.slice(0, setting_service_1.SettingService.STATIONS_ALL);
    };
    StationService.getNextStations = function () {
        return setting_service_1.SettingService.LEVEL < setting_service_1.SettingService.CRITIC_LEVEL
            ? this.stations.slice(setting_service_1.SettingService.STATIONS_PART, setting_service_1.SettingService.STATIONS_ALL)
            : [];
    };
    StationService.getCheapestStationPrice = function () {
        return this.stations[0].price;
    };
    StationService.stations = __spreadArrays(get_stations_1.getStations());
    return StationService;
}());
exports.StationService = StationService;
