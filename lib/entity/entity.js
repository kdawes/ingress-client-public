
var entity = {};



Object.defineProperties(entity, {
    'guid': {
        __proto__: null,
        get: function () { return this[0]; }
    },
    'timestamp': {
        __proto__: null,
        get: function () { return this[1]; }
    },
    'payload': {
        __proto__: null,
        get: function () { return this[2]; }
    }
});

// Items:
// 'EMITTER_A', 'EMP_BURSTER', 'MEDIA', 'PORTAL_LINK_KEY', 'POWER_CUBE',
// 'RES_SHIELD', 'FLIP_CARD', 'FORCE_AMP', 'HEATSINK', 'LINK_AMPLIFIER',
// 'MULTIHACK', 'TURRET'
// Entities
// 'PLEXT', 'LINK', 'PLAYER', 'PORTAL', 'ENERGY_GLOB'
entity.is = function (type) {
    return this.type.toLowerCase().trim() === type.toLowerCase().trim();
};

module.exports = entity;
