
var makeEntity = require('../entity'),
    geo = require('../utils/geo');


function Map(client) {
    this.__client = client;

    this.__objects = [];
    this.__energyGlobTimestamp = 0;

    this.__client
        .on('gameEntities', this.__handleGameEntities.bind(this))
        .on('deletedEntityGuids', this.__handleDeletedEntityGuids.bind(this))
        .on('energyGlobGuids', this.__handleEnergyGlobGuids.bind(this))
        .on('energyGlobTimestamp', this.__handleEnergyGlobTimestamp.bind(this));
}
module.exports = Map;



function hasKey(item, data) {
    return function (key) {
        return item[key] === data[key];
    }
}

function entityOfType(type, data) {
    return function (item) {
        return item.is(type) && (!data || Object.keys(data).every(hasKey(item, data));
    };
}

function entityNotInArray(deletedEntityGuids) {
    return function (item) {
        var guid         = item.guid,
            isNotDeleted = deletedEntityGuids.indexOf(guid) === -1;

        return isNotDeleted;
    }
}



Map.prototype.getObjects = function (lat, lng, range, callback) {
    var cellsAsHex = geo.cellsAsHex(lat, lng, range),
        dates      = cellsAsHex.map(function (cell) { return 0; }),
	    path       = 'gameplay/getObjectsInCells',
        params     = {
            cellsAsHex: cellsAsHex,
            dates: dates,
            playerLocation: geo.E6ToHex(geo.latlngToE6([lat, lng]));
        },
        callback = this.__handleResponse.bind(this, callback);
    this.__client.api(path, params, callback);
};

Map.prototype.get = function (lat, lng, range, type, data, callback) {
    this.getObjects(lat, lng, range, function (err, objects) {
        if (err) return callback(err, null);

        var filtered = objects.filter(entityOfType(type, data));

        callback(null, filtered);
    });
};


Map.prototype.__processEntities = function (entities) {
    return entities.map(makeEntity);
};


Map.prototype.__handleResponse = function (callback, err, data) {
    callback(null, this.__objects);
};


Map.prototype.__handleGameEntities = function (gameEntities) {
    var objects = this.__processEntities(gameEntities);
    this.__objects = this.__objects.concat(objects);
};


Map.prototype.__handleDeletedEntityGuids = function (deletedEntityGuids) {
    this.__objects = this.__objects.filter(entityNotInArray(deletedEntityGuids));
};


Map.prototype.__handleEnergyGlobGuids = function (energyGlobGuids) {
    this.objects = this.objects.concat(this.__processEntities(energyGlobGuids));
};


Map.prototype.__handleEnergyGlobTimestamp = function (energyGlobTimestamp) {
    this.__energyGlobTimestamp = energyGlobTimestamp;
};
