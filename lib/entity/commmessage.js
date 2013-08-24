
var entity = require('./entity'),
    commMessage = Object.create(entity);


Object.defineProperties(commMessage, {
    'type': {
        __proto__: null,
        value: 'PLEXT'
    }
});

module.exports = function (blob) {
    blob.__proto__ = commMessage;
    return blob;
};


/*
["394507b137c34bcb98654a7aeabc8ab2.d", 1368321229265, {
    "plext": {
        "text": "UnknownNR1 linked Ház (Bei der Petrikirche, 20095 Hamburg, Germany) to Trude 01 (Mönckebergstraße 23, 20095 Hamburg, Germany)",
        "team": "RESISTANCE",
        "markup": [
            ["PLAYER", {
                "plain": "UnknownNR1",
                "guid": "e05c39738e3d4a7dbddac5d3c38f63f1.c",
                "team": "RESISTANCE"
            }],
            ["TEXT", {
                "plain": " linked "
            }],
            ["PORTAL", {
                "plain": "Ház (Bei der Petrikirche, 20095 Hamburg, Germany)",
                "name": "Ház",
                "address": "Bei der Petrikirche, 20095 Hamburg, Germany",
                "guid": "4372c5e9355349efa31ce9abeb08ffdf.12",
                "latE6": 53550493,
                "lngE6": 9997210,
                "team": "RESISTANCE"
            }],
            ["TEXT", {
                "plain": " to "
            }],
            ["PORTAL", {
                "plain": "Trude 01 (Mönckebergstraße 23, 20095 Hamburg, Germany)",
                "name": "Trude 01",
                "address": "Mönckebergstraße 23, 20095 Hamburg, Germany",
                "guid": "e64222a253a74d70a3436b91ca4fc939.12",
                "latE6": 53550201,
                "lngE6": 9996529,
                "team": "RESISTANCE"
            }]
        ],
        "plextType": "SYSTEM_BROADCAST"
    }
}],
["214a7b8e2dd24e3985bd55c9a4e2030a.d", 1368314579216, {
    "plext": {
        "text": "[secure] n3bul4: argh ",
        "team": "ALIENS",
        "markup": [
            ["SECURE", {
                "plain": "[secure] "
            }],
            ["SENDER", {
                "plain": "n3bul4: ",
                "guid": "b9bb0a3270de4bc58fb8e1d9d1aa77a7.c",
                "team": "ALIENS"
            }],
            ["TEXT", {
                "plain": "argh "
            }]
        ],
        "plextType": "PLAYER_GENERATED"
    },
    "locationE6": {
        "latE6": 53701648,
        "lngE6": 9979902
    },
    "controllingTeam": {
        "team": "ALIENS"
    }
}]
*/
