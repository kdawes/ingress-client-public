
var util         = require('util'),
    EventEmitter = require('events').EventEmitter,
    API          = require('ingress-api'),
    Player       = require('./player'),
    Inventory    = require('./inventory'),
    Map          = require('./map');




function IngressClient(email, password) {
    this.__email    = email;
    this.__password = password;
}
module.exports = IngressClient;


function Client() {
    EventEmitter.call(this);

    this.__api = new API();

    // global state
    this.__player    = null;
    this.__inventory = null;
    this.__map       = null;
}
util.inherits(Client, EventEmitter);




IngressClient.prototype.login = function (callback) {

    var client = new Client();

    client.__api.login(this.__email, this.__password, function (err, data) {
        var playerEntity = null;

        if (err) {
            callback(err, null);
            return;
        }

        if (data.handshake.result.versionMatch == 'OLD_INCOMPATIBLE') {
            callback('Client version outdated. Upgrade required.', null);
            return;
        }

        playerEntity = data.handshake.result.playerEntity;
        playerEntity[2].nickname = data.handshake.result.nickname;

        client.__player = new Player(client, playerEntity);

        callback(null, data, client);
    });
}




Client.prototype.getPlayer = function (callback) {
    callback(this.__player);
};


Client.prototype.getInventory = function (callback) {
    if (!this.__inventory) {
        this.__inventory = new Inventory(this);
    }
    callback(this.__inventory);
};


Client.prototype.getMap = function (callback) {
    if (!this.__map) {
        this.__map = new Map(this);
    }
    callback(this.__map);
};


Client.prototype.api = function (method, params, callback) {
    this.__api.api(method, params, this.__apiCallback.bind(this, callback));
};


Client.prototype.__apiCallback = function (callback, err, data) {
    if (err) {
        callback(err, null);
        return;
    }

    if (data.gameBasket) {
        // [gameEntities, inventory, deletedEntityGuids, playerEntity,
        //  apGains, energyGlobGuids, energyGlobTimestamp]
        Object.keys(data.gameBasket).forEach(function (key) {
            this.emit(key, data.gameBasket[key]);
        }, this);
    }

    if (data.error) {
        this.emit('error', data.error);
    }

    if (data.result) {
        callback(null, data.result);
    }

    if (!data.result && !data.gameBasket) {
        console.log('unknown response', data);
        return;
    }
};
