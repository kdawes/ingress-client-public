
var item = require('../item/item'),
    resourceWithLevels = Object.create(item);


Object.defineProperties(resourceWithLevels, {
    'type': {
        __proto__: null,
        get: function () { return this.payload.resourceWithLevels.resourceType; }
    },
    'level': {
        __proto__: null,
        get: function () { return this.payload.resourceWithLevels.level; }
    }
});

module.exports = resourceWithLevels;
