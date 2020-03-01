"use strict";
exports.__esModule = true;
var resource_enum_1 = require("../resource/resource.enum");
function getStations() {
    return [
        {
            id: 0,
            level: 0,
            price: 3,
            name: 'Oil Station 1',
            resource: resource_enum_1.ResourceEnum.OIL,
            resourceConsumption: 2,
            efficiency: 1
        },
        {
            id: 1,
            level: 0,
            price: 4,
            name: 'Carbon Station 1',
            resource: resource_enum_1.ResourceEnum.COAL,
            resourceConsumption: 2,
            efficiency: 1
        },
        {
            id: 2,
            level: 0,
            price: 5,
            name: 'Trash Station 1',
            resource: resource_enum_1.ResourceEnum.TRASH,
            resourceConsumption: 2,
            efficiency: 1
        },
        {
            id: 3,
            level: 1,
            price: 7,
            name: 'OIL Station 2',
            resource: resource_enum_1.ResourceEnum.OIL,
            resourceConsumption: 3,
            efficiency: 2
        },
        {
            id: 4,
            level: 1,
            price: 8,
            name: 'Carbon Station 2',
            resource: resource_enum_1.ResourceEnum.COAL,
            resourceConsumption: 3,
            efficiency: 2
        },
        {
            id: 5,
            level: 1,
            price: 9,
            name: 'Trash Station 2',
            resource: resource_enum_1.ResourceEnum.TRASH,
            resourceConsumption: 3,
            efficiency: 2
        },
        {
            id: 6,
            level: 2,
            price: 11,
            name: 'Carbon Station 2',
            resource: resource_enum_1.ResourceEnum.COAL,
            resourceConsumption: 1,
            efficiency: 1
        },
        {
            id: 7,
            level: 2,
            price: 15,
            name: 'Carbon Station 2 gt',
            resource: resource_enum_1.ResourceEnum.COAL,
            resourceConsumption: 2,
            efficiency: 2
        },
        {
            id: 8,
            level: 2,
            price: 12,
            name: 'Oil Station 3',
            resource: resource_enum_1.ResourceEnum.OIL,
            resourceConsumption: 1,
            efficiency: 1
        },
        {
            id: 9,
            level: 2,
            price: 16,
            name: 'Oil Station 3 gt',
            resource: resource_enum_1.ResourceEnum.OIL,
            resourceConsumption: 2,
            efficiency: 2
        },
        {
            id: 10,
            level: 2,
            price: 13,
            name: 'Trash Station 3',
            resource: resource_enum_1.ResourceEnum.TRASH,
            resourceConsumption: 1,
            efficiency: 1
        },
        {
            id: 11,
            level: 2,
            price: 17,
            name: 'Trash Station 3',
            resource: resource_enum_1.ResourceEnum.TRASH,
            resourceConsumption: 2,
            efficiency: 2
        },
        {
            id: 12,
            level: 2,
            price: 20,
            name: 'Wind Station 3',
            resource: resource_enum_1.ResourceEnum.RENEWABLE,
            resourceConsumption: 0,
            efficiency: 1
        }
    ];
}
exports.getStations = getStations;
