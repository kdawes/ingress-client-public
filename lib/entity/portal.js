
var entity = require('./entity'),
    geo = require('../utils/geo'),
    portal = Object.create(entity);




Object.defineProperties(portal, {
    'type': {
        __proto__: null,
        value: 'PORTAL'
    }
});

module.exports = function (blob) {
    blob.__proto__ = portal;
    return blob;
};



portal.addMod = function (client, mod, slot, callback) {
    var pos = this.payload.locationE6,
        params = {
            modResourceGuid: mod.guid,
            modableGuid: this.guid,
            index: slot || 0,
            playerLocation: geo.E6ToHex([pos.latE6, pos.lngE6]).join(',')
        };
    client.api('gameplay/addMod', params, callback);
};

portal.removeMod = function (client, slot, callback) {
    var pos = this.payload.locationE6,
        params = {
            modableGuid: this.guid,
            index: slot || 0,
            playerLocation: geo.E6ToHex([pos.latE6, pos.lngE6]).join(',')
        };
    client.api('gameplay/removeMod', params, callback);
};

portal.deployResonator = function (client, resonator, slot, callback) {
    var pos = this.payload.locationE6,
        params = {
            itemGuids: [resonator.guid],
            location: geo.E6ToHex([pos.latE6, pos.lngE6]).join(','),
            portalGuid: this.guid,
            preferredSlot: slot || 0
        };
    client.api('gameplay/deployResonatorV2', params, callback);
};

portal.upgradeResonator = function (client, resonator, slot, callback) {
    var pos = this.payload.locationE6,
        params = {
            emitterGuid: resonator.guid,
            location: geo.E6ToHex([pos.latE6, pos.lngE6]).join(','),
            portalGuid: this.guid,
            resonatorSlotToUpgrade: slot || 0
        };
    client.api('gameplay/upgradeResonatorV2', params, callback);
};

portal.rechargeResonators = function (client, slots, callback) {
    var pos = this.payload.locationE6,
        params = {
            portalGuid: this.guid,
            location: geo.E6ToHex([pos.latE6, pos.lngE6]).join(','),
            resonatorSlots: slots || [0, 1, 2, 3, 4, 5, 6, 7]
        };
    client.api('gameplay/rechargeResonatorsV2', params, callback);
};

portal.hack = function (client, callback) {
    var pos = this.payload.locationE6,
        params = {
            itemGuid: this.guid,
            playerLocation: geo.E6ToHex([pos.latE6, pos.lngE6]).join(',')
        };
    client.api('gameplay/collectItemsFromPortal', params, callback);
};

portal.link = function (client, key, callback) {
    var pos = this.payload.locationE6,
        params = {
            originPortalGuid: this.guid,
            destinationPortalGuid: key.portalGuid,
            linkKeyGuid: key.guid,
            location: geo.E6ToHex([pos.latE6, pos.lngE6]).join(',')
        };
    client.api('gameplay/createLink', params, callback);
};



/*
["10d5102090a844c99c2ba4c0d07db9bf.12", 1368302392143, {
    "controllingTeam": {
        "team": "ALIENS"
    },
    "turret": {},
    "imageByUrl": {
        "imageUrl": "http://www.panoramio.com/photos/small/13186138.jpg"
    },
    "captured": {
        "capturedTime": "1368121526939",
        "capturingPlayerId": "<playerID>.c"
    },
    "locationE6": {
        "latE6": 53571154,
        "lngE6": 9954482
    },
    "portalV2": {
        "linkedEdges": [],
        "linkedModArray": [{
            "installingUser": "f271acd864da4e42be621b9e60546aba.c",
            "stats": {
                "MITIGATION": "8"
            },
            "rarity": "RARE",
            "displayName": "Portal Shield",
            "type": "RES_SHIELD"
        }, {
            "installingUser": "<playerID>.c",
            "stats": {
                "MITIGATION": "8"
            },
            "rarity": "RARE",
            "displayName": "Portal Shield",
            "type": "RES_SHIELD"
        }, {
            "installingUser": "<playerID>.c",
            "stats": {
                "MITIGATION": "10"
            },
            "rarity": "VERY_RARE",
            "displayName": "Portal Shield",
            "type": "RES_SHIELD"
        }, {
            "installingUser": "<playerID>.c",
            "stats": {
                "MITIGATION": "10"
            },
            "rarity": "VERY_RARE",
            "displayName": "Portal Shield",
            "type": "RES_SHIELD"
        }],
        "descriptiveText": {
            "ATTRIBUTION": "Yuriy:)Chulkov",
            "ADDRESS": "Fruchtallee 82, 20259 Hamburg, Germany",
            "ATTRIBUTION_LINK": "http://www.panoramio.com/photo/13186138",
            "TITLE": "[Untitled]"
        }
    },
    "defaultActionRange": {},
    "photoStreamInfo": {
        "coverPhoto": {
            "portalImageGuid": "ac80e1ba512049969c5e994997682759.17",
            "imageUrl": "http://www.panoramio.com/photos/small/13186138.jpg",
            "attributionMarkup": ["IMAGE_ATTRIBUTION", {
                "plain": "Yuriy:)Chulkov",
                "attributionLink": "http://www.panoramio.com/photo/13186138"
            }],
            "voteCount": 0
        },
        "photoCount": 1
    },
    "resonatorArray": {
        "resonators": [{
            "level": 8,
            "distanceToPortal": 37,
            "ownerGuid": "<playerID>.c",
            "energyTotal": 6000,
            "slot": 0,
            "id": "3afa03e3-dbc4-4824-b7a8-1653213edc00"
        }, {
            "level": 8,
            "distanceToPortal": 27,
            "ownerGuid": "<playerID>.c",
            "energyTotal": 6000,
            "slot": 1,
            "id": "322b0f55-1003-44dd-842d-28439d598780"
        }, {
            "level": 7,
            "distanceToPortal": 37,
            "ownerGuid": "<playerID>.c",
            "energyTotal": 5000,
            "slot": 2,
            "id": "f4549f64-cbc0-4134-85e3-5088b8087d51"
        }, {
            "level": 7,
            "distanceToPortal": 27,
            "ownerGuid": "<playerID>.c",
            "energyTotal": 5000,
            "slot": 3,
            "id": "0c43d963-5325-47a1-85c9-75a2003d6659"
        }, {
            "level": 7,
            "distanceToPortal": 27,
            "ownerGuid": "<playerID>.c",
            "energyTotal": 5000,
            "slot": 4,
            "id": "e02ccea4-1d02-4664-b9c6-6f9eea83994c"
        }, {
            "level": 6,
            "distanceToPortal": 27,
            "ownerGuid": "<playerID>.c",
            "energyTotal": 4000,
            "slot": 5,
            "id": "bb8eaf07-485c-4616-9733-de580cb98791"
        }, {
            "level": 6,
            "distanceToPortal": 27,
            "ownerGuid": "<playerID>.c",
            "energyTotal": 4000,
            "slot": 6,
            "id": "50abfe89-ad1b-462b-b01d-17f09d5046c5"
        }, {
            "level": 6,
            "distanceToPortal": 27,
            "ownerGuid": "<playerID>.c",
            "energyTotal": 4000,
            "slot": 7,
            "id": "3fe68719-d398-46f8-9a2d-d290e0db4eb7"
        }]
    }
}]
*/
