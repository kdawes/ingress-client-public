
var geo = {};

geo.latlngToE6 = function (pair) {
    return pair.map(function (location) { return location * 1E6; });
};

geo.latlngFromE6 = function (pair) {
    return pair.map(function (location) { return location / 1E6; });
};

geo.latlngToHex = function (pair) {
    return this.toHex(this.latlngToE6(pair));
};

geo.latlngFromHex = function (pair) {
    return this.latlngFromE6(this.fromHex(pair));
};

geo.E6ToHex = function (pair) {
    return pair.map(function (location) {
        var hex = location.toString(16),
            len = 8;

        if (hex.indexOf("-") > -1) {
            hex = (parseInt("ffffffff", 16) - parseInt(hex.substr(1), 16)).toString(16);
        }
        while (hex.length < len) {
            hex = "0" + hex;
        }

        return hex;
    });
};

geo.E6FromHex = function (pair) {
    return pair.map(function (hex) { return parseInt(hex, 16); });
};

module.exports = geo;
