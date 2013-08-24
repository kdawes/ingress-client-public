
var resourceWithLevels = require('../resources/resourcewithlevels'),
    media = Object.create(resourceWithLevels);


Object.defineProperties(media, {
    'primaryUrl': {
        __proto__: null,
        get: function () { return this.payload.storyItem.primaryUrl; }
    },
    'shortDescription': {
        __proto__: null,
        get: function () { return this.payload.storyItem.shortDescription; }
    },
    'hasBeenViewed': {
        __proto__: null,
        get: function () { return this.payload.storyItem.hasBeenViewed; }
    },
    'imageByUrl': {
        __proto__: null,
        get: function () { return this.payload.imageByUrl.imageUrl; }
    }
});

module.exports = media;


/*
["81ece82e8ffa4dd69329f685d95bafea.5", 1363658873671, {
    "inInventory": {
        "playerId": "<playerID>.c",
        "acquisitionTimestampMs": "1363658873284"
    },
    "storyItem": {
        "primaryUrl": "http://www.youtube.com/watch?v\u003dIWe4jZc1nBI",
        "shortDescription": "Comiccon2",
        "hasBeenViewed": false
    },
    "imageByUrl": {
        "imageUrl": "http://commondatastorage.googleapis.com/objx/thmb/Investigation2.png"
    },
    "resourceWithLevels": {
        "resourceType": "MEDIA",
        "level": 1
    }
}]
*/
