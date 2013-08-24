
var entity = require('./entity'),
    player = Object.create(entity);


Object.defineProperties(player, {
    'nickname': {
        __proto__: null,
        get: function () { return this.payload.nickname; }
    },
    'team': {
        __proto__: null,
        get: function () { return this.payload.controllingTeam.team; }
    },
    'ap': {
        __proto__: null,
        get: function () { return this.payload.playerPersonal.ap; }
    },
    'energy': {
        __proto__: null,
        get: function () { return this.payload.playerPersonal.energy; }
    },
    'type': {
        __proto__: null,
        value: 'PLAYER'
    }
});

module.exports = function (blob) {
    blob.__proto__ = player;
    return blob;
};


/*
 "handshake": {
    versionMatch: 'CURRENT',
    serverVersion: '2013-05-08T21:20:11Z 961bf14445ee opt',
    playerEntity: ["<playerID>.c", 1368302392100, {
        "controllingTeam": {
            "team": "ALIENS"
        },
        "playerPersonal": {
            "ap": "1518525",
            "energy": 3983,
            "allowNicknameEdit": false,
            "allowFactionChoice": false,
            "clientLevel": 36,
            "mediaHighWaterMarks": {
                "General": 68,
                "RESISTANCE": 1,
                "ALIENS": 11
            },
            "energyState": "XM_OK",
            "notificationSettings": {
                "shouldSendEmail": false,
                "maySendPromoEmail": false,
                "shouldPushNotifyForAtPlayer": true,
                "shouldPushNotifyForPortalAttacks": true
            }
        }
    }],
    nickname: 'foo',
    xsrfToken: '...',
    storage: [Object],
    canPlay: true,
    pregameStatus: [Object],
    initialKnobs: [Object]
}
*/
