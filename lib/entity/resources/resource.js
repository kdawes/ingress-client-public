
var item = require('../item/item'),
    resource = Object.create(item);


Object.defineProperties(resource, {
    'type': {
        __proto__: null,
        get: function () { return this.payload.resource.resourceType; }
    }
});

module.exports = resource;
