
var resourceWithLevels = require('../resources/resourcewithlevels'),
    resonator = Object.create(resourceWithLevels);


module.exports = resonator;


/*
["04ef03445e3245d4bbee9e1c4659118b.5", 1368187183361, {
    "accessLevel": {
        "requiredLevel": 3,
        "failure": {
            "isAllowed": false,
            "requiredLevel": 3
        }
    },
    "inInventory": {
        "playerId": "<playerID>.c",
        "acquisitionTimestampMs": "1368187182878"
    },
    "resourceWithLevels": {
        "resourceType": "EMITTER_A",
        "level": 3
    }
}]
*/
