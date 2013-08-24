
var makeEntity = require('../entity');



function Player(client, player) {
    this.__client = client;
    this.entity   = makeEntity(player);
    this.nickname = this.entity.nickname;

    this.__client
        .on('playerEntity', this.__handlePlayerEntity.bind(this))
        .on('apGains', this.__handleApGains.bind(this));
}
module.exports = Player;



Player.prototype.__handlePlayerEntity = function (playerEntity) {
    this.entity = makeEntity(playerEntity);
    this.entity.nickname = this.nickname;
};


Player.prototype.__handleApGains = function (apGains) {};
