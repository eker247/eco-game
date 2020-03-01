"use strict";
exports.__esModule = true;
var resource_enum_1 = require("./resource.enum");
function getResources() {
    var _a;
    return _a = {},
        _a[resource_enum_1.ResourceEnum.COAL] = {
            name: resource_enum_1.ResourceEnum.COAL,
            availableItems: 25,
            startPrice: 10,
            perPrice: 3
        },
        _a[resource_enum_1.ResourceEnum.OIL] = {
            name: resource_enum_1.ResourceEnum.OIL,
            availableItems: 20,
            startPrice: 10,
            perPrice: 3
        },
        _a[resource_enum_1.ResourceEnum.TRASH] = {
            name: resource_enum_1.ResourceEnum.TRASH,
            availableItems: 15,
            startPrice: 10,
            perPrice: 3
        },
        _a[resource_enum_1.ResourceEnum.URAN] = {
            name: resource_enum_1.ResourceEnum.URAN,
            availableItems: 3,
            startPrice: 16,
            perPrice: 1
        },
        _a;
}
exports.getResources = getResources;
