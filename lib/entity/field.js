
var entity = require('./entity'),
    field = Object.create(entity);


Object.defineProperties(field, {
    'type': {
        __proto__: null,
        value: 'FIELD'
    }
});

module.exports = function (blob) {
    blob.__proto__ = field;
    return blob;
};


/*
["2b91be7b03904ed58c96a3536e2937bf.b", 1362011301179, {
    "controllingTeam": {
        "team": "RESISTANCE"
    },
    "capturedRegion": {
        "vertexA": {
            "guid": "49e805b9277d431181e6c88b7bbf12fe.12",
            "location": {
                "latE6": 53553803,
                "lngE6": 9991711
            }
        },
        "vertexB": {
            "guid": "c3654c126b374f658bd38dbd520dc86c.12",
            "location": {
                "latE6": 53544506,
                "lngE6": 9998221
            }
        },
        "vertexC": {
            "guid": "4a81127f7c954aaeb56c4182da12000b.12",
            "location": {
                "latE6": 53553407,
                "lngE6": 9992196
            }
        }
    },
    "creator": {
        "creatorGuid": "<playerID>.c",
        "creationTime": "1362011300951"
    },
    "entityScore": {
        "entityScore": "7"
    }
}]
*/
