
var resource = require('../resources/resource'),
        key = Object.create(resource);


Object.defineProperties(key, {
    'portalGuid': {
        __proto__: null,
        get: function () { return this.payload.portalCoupler.portalGuid; }
    },
    'portalLocation': {
        __proto__: null,
        get: function () { return this.payload.portalCoupler.portalLocation; }
    },
    'portalImageUrl': {
        __proto__: null,
        get: function () { return this.payload.portalCoupler.portalImageUrl; }
    },
    'portalTitle': {
        __proto__: null,
        get: function () { return this.payload.portalCoupler.portalTitle; }
    },
    'portalAddress': {
        __proto__: null,
        get: function () { return this.payload.portalCoupler.portalAddress; }
    }
});

module.exports = key;


/*
["63337595192344a3b05786cccf5f747b.5", 1368186904408, {
    "portalCoupler": {
        "portalGuid": "b5741b803476440e855cbfe129b5bbc3.12",
        "portalLocation": "0277c45b,00212d37",
        "portalImageUrl": "http://www.panoramio.com/photos/small/1019318.jpg",
        "portalTitle": "Sagrada Familia (interior) 2",
        "portalAddress": "Plaça de la Sagrada Família, 316, 08013 Barcelona, Province of Barcelona, Spain"
    },
    "inInventory": {
        "playerId": "<playerID>.c",
        "acquisitionTimestampMs": "1368186895388"
    },
    "resource": {
        "resourceType": "PORTAL_LINK_KEY",
        "resourceRarity": "VERY_COMMON"
    }
}]
*/
