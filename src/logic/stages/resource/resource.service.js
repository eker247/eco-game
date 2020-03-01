"use strict";
exports.__esModule = true;
var get_resources_1 = require("./get-resources");
var ResourceService = /** @class */ (function () {
    function ResourceService() {
    }
    ResourceService.getPrice = function (resourceName, quantity) {
        if (!resourceName || !this.resRepo[resourceName]) {
            throw new Error("RS.getPrice - resource not exist " + resourceName);
        }
        else if (quantity < 1) {
            throw new Error("RS.getPrice - requested incorrect quantity " + quantity);
        }
        else if (quantity > this.resRepo[resourceName].availableItems) {
            throw new Error("RS.getPrice - requested quantity: " + quantity + ", available: " + this.resRepo[resourceName].availableItems);
        }
        var resource = this.resRepo[resourceName];
        var total = 0;
        while (quantity-- && resource.availableItems) {
            var current = resource.startPrice -
                Math.ceil(resource.availableItems-- / resource.perPrice) +
                1;
            total += current;
        }
        return total;
    };
    ResourceService.getItems = function (resourceName, quantity) {
        if (!resourceName || !this.resRepo[resourceName]) {
            throw new Error('RS.getItems - Resource not exist');
        }
        else if (quantity < 1) {
            throw new Error('RS.getItems - Number incorrect');
        }
        else if (quantity > this.resRepo[resourceName].availableItems) {
            throw new Error('RS.getItems - Resource not exist');
        }
        this.resRepo[resourceName].availableItems -= quantity;
        return quantity;
    };
    ResourceService.resRepo = get_resources_1.getResources();
    return ResourceService;
}());
exports.ResourceService = ResourceService;
