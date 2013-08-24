
var math = require('./mathutils');

const kFaceBits     = 3;
const kNumFaces     = 6;
const kMaxCellLevel = 30;
const kMaxLevel     = kMaxCellLevel;
const kMaxSize      = 1 << kMaxLevel;
const kPosBits      = 2 * kMaxLevel + 1;

const kSwapMask     = 0x01;
const kInvertMask   = 0x02;
const kLookupBits   = 4;

const kPosToOrientation = [kSwapMask, 0, 0, kInvertMask + kSwapMask];
const kPosToIJ = [
    [0, 1, 3, 2],
    [0, 2, 3, 1],
    [3, 2, 0, 1],
    [3, 1, 0, 2]
];



var S2 = { lookup_pos: [], lookup_ij: [] };
module.exports = S2;


S2._initLookupCell = function (level, i, j, orig_orientation, pos, orientation) {
    if (level === kLookupBits) {
        var ij = (i << kLookupBits) + j;
        this.lookup_pos[(ij << 2) + orig_orientation] = (pos << 2) + orientation;
        this.lookup_ij[(pos << 2) + orig_orientation] = (ij << 2) + orientation;
    } else {
        level++;
        i <<= 1;
        j <<= 1;
        pos <<= 2;
        const r = kPosToIJ[orientation];
        this._initLookupCell(level, i + (r[0] >> 1), j + (r[0] & 1), orig_orientation,
                pos, orientation ^ kPosToOrientation[0]);
        this._initLookupCell(level, i + (r[1] >> 1), j + (r[1] & 1), orig_orientation,
                pos + 1, orientation ^ kPosToOrientation[1]);
        this._initLookupCell(level, i + (r[2] >> 1), j + (r[2] & 1), orig_orientation,
                pos + 2, orientation ^ kPosToOrientation[2]);
        this._initLookupCell(level, i + (r[3] >> 1), j + (r[3] & 1), orig_orientation,
                pos + 3, orientation ^ kPosToOrientation[3]);
    }
};

S2._init = function () {
    this._initLookupCell(0, 0, 0, 0, 0, 0);
    this._initLookupCell(0, 0, 0, kSwapMask, 0, kSwapMask);
    this._initLookupCell(0, 0, 0, kInvertMask, 0, kInvertMask);
    this._initLookupCell(0, 0, 0, kSwapMask | kInvertMask, 0, kSwapMask | kInvertMask);
    this._init = function () {};
};

S2._fromFaceIJ = function (face, i, j) {
    this._init();

    var n = [0, face << (kPosBits - 33)];
    var bits = face & kSwapMask;

    var k = 8;
    while (k--) {
        const mask = (1 << kLookupBits) - 1;
        bits += (( j >> (k * kLookupBits)) & mask) << (kLookupBits + 2);
        bits += ((j >> (k * kLookupBits)) & mask) << 2;
        bits = this.lookup_pos[bits];
        n[k >> 2] |= (bits >> 2) << ((k & 3) * 2 * kLookupBits);
        bits &= (kSwapMask | kInvertMask);
    }

    return ((math.lshift(n[1], 32) + n[0]) * 2 + 1);
};

S2._uvToST = function (u) {
    if (u >= 0) {
        return Math.sqrt(1 + 3 * u) - 1;
    } else {
        return 1 - Math.sqrt(1 - 3 * u);
    }
};

S2._stToIJ = function (s) {
    var m = kMaxSize / 2;
    return Math.max(0, Math.min(parseInt(2 * m - 1), parseInt((m * s + (m - 0.5)) + 0.5)));
};

S2.posToCellID = function (lat, lng) {
    var theta = math.deg2rad(lat);
    var phi = math.deg2rad(lng);
    var cosphi = Math.cos(phi);

    var x = Math.cos(theta) * cosphi;
    var y = Math.sin(theta) * cosphi;
    var z = Math.sin(phi);

    var face = 0;

    if (Math.abs(y) > Math.abs(x) && Math.abs(y) > Math.abs(z)) {
        face = 1;
    }
    if (Math.abs(z) > Math.abs(x) && Math.abs(z) > Math.abs(y)) {
        face = 2;
    }
    if ((face === 0 && x < 0) || (face === 1 && y < 0) || (face === 2 && z < 0)) {
        face += 3;
    }

    var pu, pv;

    switch (face) {
        case 0:
            pu = y / x;
            pv = z / x;
        break;
        case 1:
            pu = -x / y;
            pv = z / y;
        break;
        case 2:
            pu = -x / z;
            pv = -y / z;
        break;
        case 3:
            pu = z / x;
            pv = y / x;
        break;
        case 4:
            pu = z / y;
            pv = -x / y;
        break;
        default:
            pu = -y / z;
            pv = -x / z;
        break;
    }

    var i = this._stToIJ(this._uvToST(pu));
    var j = this._stToIJ(this._uvToST(pv));

    return this._fromFaceIJ(face, i, j);
};

S2._cellIDLsb = function (id) {
    return math.and(id, -id);
};

S2._cellIDFace = function (id) {
    return math.rshift(id, kPosBits);
};

S2._lsbForLevel = function (level) {
    return math.lshift(1, 2 * (kMaxLevel - level));
};

S2._stToUV = function (s) {
    if (s >= 0.5) {
        return (1 / 3) * (4 * s * s - 1);
    }
    return (1 / 3) * (1 - 4 * (1 - s) * ( 1 - s));
};

S2._faceUVToXYZ = function (face, u, v) {
    switch (face) {
        case 0:
            return [1, u, v];
        break;
        case 1:
            return [-u, 1, v];
        break;
        case 2:
            return [-u, -v, 1];
        break;
        case 3:
            return [-1, -v, -u];
        break;
        case 4:
            return [v, -1, -u];
        break;
        case 5:
            return [v, u, -1];
        break;
    }
    return [0, 0, 0];
};

S2.cellIDToPos = function (id) {
    this._init();
    var face = this._cellIDFace(id);
    var bits = face & kSwapMask;
    var nbits = kMaxLevel - 7 * kLookupBits;
    var i = 0;
    var j = 0;

    for (var k = 7; k >= 0; k--) {
        var a = math.rshift(id, k * 2 * kLookupBits + 1);
        var b = math.lshift(1, 2 * nbits) - 1;
        bits += math.lshift(math.and(a, b), 2);
        bits = lookup_ij[bits];
        i += (bits >> (kLookupBits + 2)) << k * kLookupBits;
        j += ((bits >> 2) & ((1 << kLookupBits) - 1)) << k * kLookupBits;
        bits &= (kSwapMask | kInvertMask);
        nbits = kLookupBits;
    }

    if (math.and(this._cellIDLsb(id), 0x1111111111111110) !== 0) {
        bits ^= kSwapMask;
    }

    var delta = 0;

    if (this._cellIDIsLeaf(id)) {
        delta = 1;
    } else if ((i ^ id >> 2) & 1 !== 0) {
        delta = 2;
    }

    var si = 2 * i + delta;
    var ti = 2 * j + delta;

    var pu = this._stToUV((0.5 / kMaxSize) * si);
    var pv = this._stToUV((0.5 / kMaxSize) * ti);
    var p = this._faceUVToXYZ(face, pu, pv);

    var lat = math.rad2deg(Math.atan2(p[2], Math.sqrt(p[0] * p[0] + p[1] * p[1])));
    var lng = math.rad2deg(Math.atan2(p[1], p[0]));

    return [lat, lng];
};

S2._cellIDIsLeaf = function (id) {
    return math.and(id, 1) !== 0;
};

S2.cellIDParent = function (id, level) {
    var lsb = this._lsbForLevel(level);
    return math.or(math.and(id, -lsb), lsb);
};
