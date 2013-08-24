
var resourceWithLevels = require('../resources/resourcewithlevels'),
    burster = Object.create(resourceWithLevels);


burster.fire = function (client, position, callback) {
    var params = {
        itemGuid: this.guid,
        playerLocation: position
    };
    client.api('gameplay/fireUntargetedRadialWeapon', params, callback);
};

module.exports = burster;


/*
["7c52e1f19f6942dcb2a15515b607154c.5", 1368187263460, {
    "empWeapon": {
        "level": 1,
        "ammo": 1
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
        "acquisitionTimestampMs": "1368187256191"
    },
    "resourceWithLevels": {
        "resourceType": "EMP_BURSTER",
        "level": 1
    }
}]
*/
