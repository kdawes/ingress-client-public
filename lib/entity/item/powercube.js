
var resourceWithLevels = require('../resources/resourcewithlevels'),
    powerCube = Object.create(resourceWithLevels);


Object.defineProperties(powerCube, {
    'energy': {
        __proto__: null,
        get: function () { return this.payload.powerCube.energy; }
    }
});

powerCube.use = function (client, position, callback) {
    var params = {
        itemGuid: this.guid,
        playerLocation: position
    };
    client.api('gameplay/dischargePowerCube', params, callback);
};

module.exports = powerCube;


/*
["cb08f575e7774d2e9b6abf1d0b2f6151.5", 1368187201154, {
    "powerCube": {
        "energy": 1000
    },
    "accessLevel": {
        "requiredLevel": 1,
        "failure": {
            "isAllowed": false,
            "requiredLevel": 1
        }
    },
    "inInventory": {
        "playerId": "<playerID>.c",
        "acquisitionTimestampMs": "1368187197617"
    },
    "resourceWithLevels": {
        "resourceType": "POWER_CUBE",
        "level": 1
    }
}]
*/
