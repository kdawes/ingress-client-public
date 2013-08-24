
var geo      = require('../../utils/geo'),
    resource = require('../resources/resource'),
    flipCard = Object.create(resource);


Object.defineProperties(flipCard, {
    'flipCardType': {
        __proto__: null,
        get: function () { return this.payload.flipCard.flipCardType; }
    }
});

flipCard.use = function (client, portal, callback) {
    var pos = portal.payload.locationE6,
        params = {
            portalGuid: portal.guid,
            resourceGuid: this.guid,
            playerLocation: geo.E6ToHex([pos.latE6, pos.lngE6]).join(',')
        };
    client.api('gameplay/flipPortal', params, callback);
};

module.exports = flipCard;


/*
["14760e7b9f674b84937a89e3d7f3c1c0.5", 1369325720956, {
        "displayName": {
            "displayName": "JARVIS Virus",
            "displayDescription": "The JARVIS Virus can be used to reverse the alignment of a Resistance Portal."
        },
        "inInventory": {
            "playerId": "<playerID>.c",
            "acquisitionTimestampMs": "1369325720545"
        },
        "resource": {
            "resourceType": "FLIP_CARD",
            "resourceRarity": "VERY_RARE"
        },
        "flipCard": {
            "flipCardType": "JARVIS"
        }
    }
]
*/
