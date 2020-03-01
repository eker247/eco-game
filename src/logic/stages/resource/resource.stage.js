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
var resource_service_1 = require("./resource.service");
var stage_1 = require("../stage");
var ResourceStage = /** @class */ (function (_super) {
    __extends(ResourceStage, _super);
    function ResourceStage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceStage.prototype.getPrice = function (resourceName, quantity) {
        return resource_service_1.ResourceService.getPrice(resourceName, quantity);
    };
    ResourceStage.prototype.buyResource = function (player, resourceName, quantity) {
        if (!player) {
            throw new Error('ResSt.buyResource - Player incorrect');
        }
        var price = this.getPrice(resourceName, quantity);
        if (player.cash < price) {
            throw new Error('ResSt.buyResource - No enough cash');
        }
        player.resources[resourceName]
            ? (player.resources[resourceName] += quantity)
            : (player.resources[resourceName] = quantity);
        resource_service_1.ResourceService.getItems(resourceName, quantity);
        player.spend(price);
    };
    ResourceStage.prototype.setStagePlayers = function () {
        this.stagePlayers = this.stagePlayers.filter(function (player) {
            var resources = (player.stations || []).map(function (station) { return station.resource; });
            return resources.some(function (res) { return resource_service_1.ResourceService.getPrice(res, 1) < player.cash; });
        });
    };
    return ResourceStage;
}(stage_1.Stage));
exports.ResourceStage = ResourceStage;
