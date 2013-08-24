
var itemPrototypes = {
        'EMITTER_A':       require('./resonator'),
        'EMP_BURSTER':     require('./burster'),
        'MEDIA':           require('./media'),
        'PORTAL_LINK_KEY': require('./key'),
        'POWER_CUBE':      require('./powercube'),
        'RES_SHIELD':      require('./shield'),
        'FLIP_CARD':       require('./flipcard'),
        'FORCE_AMP':       require('./forceamp'),
        'HEATSINK':        require('./heatsink'),
        'LINK_AMPLIFIER':  require('./linkamp'),
        'MULTIHACK':       require('./multihack'),
        'TURRET':          require('./turret')
    };




function makeItem(blob) {
    var payload         = blob[2],
        resourceType    = '',
        itemPrototype   = null;

    if (typeof payload.resourceWithLevels !== 'undefined') {
        resourceType = payload.resourceWithLevels.resourceType;
    } else if (typeof payload.resource !== 'undefined') {
        resourceType = payload.resource.resourceType;
    } else if (typeof payload.modResource !== 'undefined') {
        resourceType = payload.modResource.resourceType;
    } else {
        console.log('unknown item', payload);
        return;
    }

    itemPrototype = itemPrototypes[resourceType];

    if (!itemPrototype) {
        console.log('resourceType not implemented', resourceType, payload);
        return;
    }

    blob.__proto__ = itemPrototype;
    return blob;
}
module.exports = makeItem;



/*
// item (laying on ground)
["1b83cc8f9fef4ca480e49b4ec48bef3e.4", 1368301783505, {
    "locationE6": {
        "latE6": 53572585,
        "lngE6": 9952708
    },
    "defaultActionRange": {},
    "portalCoupler": {
        "portalGuid": "e30884702ad84b7380255298f9d534db.11",
        "portalLocation": "03317cd5,0097d4e0",
        "portalImageUrl": "http://lh3.ggpht.com/Dd4NEq9ZPLMDxygE2JGLU_ZW5gPUSQ0BAtlB89u3E5X4U569lQ5kmEaH4H9dP0vItqUJL79kuSjrNNwkybzRKBi6VawhQ8JiXAdvKs1_5teYbLT2",
        "portalTitle": "Unna-Park",
        "portalAddress": "Heußweg 16, 20255 Hamburg, Germany"
    },
    "resource": {
        "resourceType": "PORTAL_LINK_KEY",
        "resourceRarity": "VERY_COMMON"
    }
}]
// item in inventory
["7c52e1f19f6942dcb2a15515b607154c.5", 1368187263460, {
    "empWeapon": {
        "level": 1,
        "ammo": 1
    },
    "accessLevel": {
        "requiredLevel": 1,
        "failure": {
            "isAllowed": false,
            "requiredLevel": 1
        }
    },
    "inInventory": {
        "playerId": "<playerID>.c",
        "acquisitionTimestampMs": "1368187256191"
    },
    "resourceWithLevels": {
        "resourceType": "EMP_BURSTER",
        "level": 1
    }
}]
*/
