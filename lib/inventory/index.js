
var makeEntity = require('../entity'),
    Cache      = require('../cache');




function Inventory(client) {
    this.__client    = client;
    this.__cache     = new Cache();

    var playerGuid = this.__client.__player.entity.guid;

    this.__cachekey  = 'inventory-' + playerGuid + '.json';
    this.__items     = [];
    this.__timestamp = 0;

    this.__client
        .on('inventory', this.__handleInventory.bind(this))
        .on('deletedEntityGuids', this.__handleDeletedEntityGuids.bind(this));
}
module.exports = Inventory;



function hasKey(item, data) {
    return function (key) {
        return item[key] === data[key];
    }
}

function itemOfType(type, data) {
    return function (item) {
        return item.is(type) && (!data || Object.keys(data).every(hasKey(item, data));
    };
}

function itemNotInArray(deletedEntityGuids) {
    return function (item) {
        var guid         = item.guid,
            isNotDeleted = deletedEntityGuids.indexOf(guid) === -1;

        return isNotDeleted;
    }
}



Inventory.prototype.getItems = function (callback, forceFetch) {
    var cached = null;

    if (!this.__items.length) {
        cached = this.__cache.read(this.__cachekey);
        if (cached) {
            this.__timestamp = cached.timestamp;
            this.__items = this.__processEntities(cached.entities);
        } else {
            forceFetch = true;
        }
    }

    if (forceFetch) {
        this.__fetchInventory(this.__timestamp, callback);
    } else {
        callback(null, this.__items);
    }
};


Inventory.prototype.get = function (type, data, callback) {
    this.getItems(function (err, items) {
        if (err) return callback(err, null);

        var filtered = items.filter(itemOfType(type, data));

        callback(null, filtered);
    });
};


Inventory.prototype.__processEntities = function (entities) {
    return entities.map(makeEntity);
};


Inventory.prototype.__handleInventory = function (entities) {
    var items = this.__processEntities(entities);
    this.__items = this.__items.concat(items);
};


Inventory.prototype.__handleDeletedEntityGuids = function (deletedEntityGuids) {
    this.__items = this.__items.filter(itemNotInArray(deletedEntityGuids));
};


Inventory.prototype.__handleResponse = function (callback, err, timestamp) {
    this.__timestamp = timestamp;

    this.__cache.write(this.__cachekey, {
        timestamp: timestamp,
        entities: this.__items
    });

    callback(null, this.__items);
};


Inventory.prototype.__fetchInventory = function (timestamp, callback) {
    var path     = 'playerUndecorated/getInventory',
        params   = { lastQueryTimestamp: timestamp },
        callback = this.__handleResponse.bind(this, callback);

    this.__client.api(path, params, callback);
};
