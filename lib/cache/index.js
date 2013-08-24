
var fs = require('fs');



function Cache() {
    this.enabled = true;
    this.path = '.cache';

    if (! fs.existsSync(this.path)) {
        try {
            fs.mkdirSync(this.path);
        } catch (e) {
            console.log('[CACHE] error creating cache folder: ', e);
        }
    }
}
module.exports = Cache;



Cache.prototype.get_path = function(key) {
    return this.path + '/' + key;
};

Cache.prototype.write = function(key, value) {
    value = JSON.stringify(value);
    try {
        fs.writeFileSync(this.get_path(key), value);
    } catch (e) {
        console.log('[CACHE] error writing to cache file: ', e);
        return false;
    }

    console.log('[CACHE]', value.length, 'bytes written to', key);
    return true;
};

Cache.prototype.read = function(key) {
    try {
        var value = JSON.parse(fs.readFileSync(this.get_path(key)));
        console.log('[CACHE] HIT for', key);
        return value;
    } catch (e) {
        console.log('[CACHE] MISS for', key);
        return null;
    }
};
