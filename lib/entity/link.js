
var entity = require('./entity'),
    link = Object.create(entity);


Object.defineProperties(link, {
    'type': {
        __proto__: null,
        value: 'LINK'
    }
});

module.exports = function (blob) {
    blob.__proto__ = link;
    return blob;
};


/*
["f1c4c16a90a84131bc9f74eeee155a9f.9", 1368313855419, {
    "edge": {
        "originPortalGuid": "520e416aa78045ce9e3e08901d595d96.11",
        "destinationPortalGuid": "793fce98ef2d467f814bf2bf570bc831.11",
        "originPortalLocation": {
            "latE6": 53575741,
            "lngE6": 9944222
        },
        "destinationPortalLocation": {
            "latE6": 53558611,
            "lngE6": 9951388
        }
    },
    "creator": {
        "creatorGuid": "<playerID>.c",
        "creationTime": "1368313855134"
    },
    "controllingTeam": {
        "team": "RESISTANCE"
    }
}]
*/
