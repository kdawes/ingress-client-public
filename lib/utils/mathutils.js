
module.exports = {
    deg2rad: function (deg) { return deg * Math.PI / 180; },
    rad2deg: function (rad) { return rad / Math.PI * 180; },
    /**
     * Methods below are used for bitwise operations on numbers > 32bit.
     */
    _TWO_POW_32: Math.pow(2, 32),
    _num2HiLo: function (num) {
        var hi = num / this._TWO_POW_32;
        var lo = num % this._TWO_POW_32;
        return [hi, lo];
    },
    _hiLo2Num: function (hi, lo) {
        return hi * this._TWO_POW_32 + lo;
    },
    lshift: function (num, bits) { return num * Math.pow(2, bits); },
    rshift: function (num, bits) { return num / Math.pow(2, bits); },
    and: function (val1, val2) {
        var num1 = this._num2HiLo(val1);
        var num2 = this._num2HiLo(val2);
        return this._hiLo2Num(num1[0] & num2[0], num1[1] & num2[1]);
    },
    or: function (val1, val2) {
        var num1 = this._num2HiLo(val1);
        var num2 = this._num2HiLo(val2);
        return this._hiLo2Num(num1[0] | num2[0], num1[1] | num2[1]);
    }
};
