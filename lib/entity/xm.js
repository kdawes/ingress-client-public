
var entity = require('./entity'),
    xm = Object.create(entity);


Object.defineProperties(xm, {
    'cellsAsHex': {
        __proto__: null,
        get: function () { return this.guid.substr(16); }
    },
    'energy': {
        __proto__: null,
        get: function () { return parseInt(this.guid.substr(-4, 2), 16); }
    },
    'type': {
        __proto__: null,
        value: 'ENERGY_GLOB'
    }
});

module.exports = function (blob) {
    blob.__proto__ = xm;
    return blob;
};

/*
TODO: investigate this! XXX
"energyGlobGuids": [
    "47b18f5a1e90000000031b7c00000051.6",
    "47b18f5a21d0000000031dcf0000000d.6",
    "47b18f59471000000002cd6400000014".length === 32
     ^^^^^^^^^^^^^^^^              ^^
                     ^^^^^^^^^^^^^^
     16 chars cellsAsHex         2 chars XM amount
                     14 chars ???
]

"cellsAsHex": [
    "47b18f5bd0000000".length === 16
]
*/
