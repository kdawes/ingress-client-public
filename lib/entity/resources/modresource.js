
var item = require('../item/item'),
    modResource = Object.create(item);


Object.defineProperties(modResource, {
    'type': {
        __proto__: null,
        get: function () { return this.payload.modResource.resourceType; }
    },
    'rarity': {
        __proto__: null,
        get: function () { return this.payload.modResource.rarity; }
    },
    'displayName': {
        __proto__: null,
        get: function () { return this.payload.modResource.displayName; }
    },
    'stats': {
        __proto__: null,
        get: function () { return this.payload.modResource.stats; }
    }
});


module.exports = modResource;
