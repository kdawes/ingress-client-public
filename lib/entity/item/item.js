
var geo    = require('../../utils/geo'),
    entity = require('../entity'),
    item   = Object.create(entity);


item.drop = function (client, position, callback) {
    var params = {
            itemGuid: this.itemGuid,
            playerLocation: position
        };
    client.api('gameplay/dropItem', params, callback);
};

item.pickup = function (client, callback) {
    var pos = this.payload.locationE6,
        params = {
            itemGuid: this.itemGuid,
            playerLocation: geo.E6ToHex([pos.latE6, pos.lngE6]).join(',')
        };
    client.api('gameplay/pickUp', params, callback);
};

item.recycle = function (client, position, callback) {
    var params = {
            itemGuid: this.itemGuid,
            playerLocation: position
        };
    client.api('gameplay/recycleItem', params, callback);
};

module.exports = item;
