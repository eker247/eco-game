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
var HouseStage = /** @class */ (function (_super) {
    __extends(HouseStage, _super);
    function HouseStage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HouseStage.prototype.setStagePlayers = function () {
        this.stagePlayers = this.stagePlayers.filter(function (player) {
            return player.cash >=
                setting_service_1.SettingService.HOUSE_BASIC_PRICE +
                    (setting_service_1.SettingService.LEVEL - 1) * setting_service_1.SettingService.HOUSE_EXTRA_PRICE;
        });
    };
    return HouseStage;
}(stage_1.Stage));
exports.HouseStage = HouseStage;
