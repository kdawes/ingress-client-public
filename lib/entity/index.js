
var makeField       = require('./field'),
    makePlayer      = require('./player'),
    makeCommMessage = require('./commmessage'),
    makeXM          = require('./xm'),
    makeLink        = require('./link'),
    makePortal      = require('./portal'),
    makeItem        = require('./item'),
    factoryMappings = {
        '2': makePortal,
        'b':  makeField,
        'c':  makePlayer,
        'd':  makeCommMessage,
        '4':  makeItem,
        '5':  makeItem,
        '6':  makeXM,
        '9':  makeLink,
        '11': makePortal,
        '12': makePortal,
        '16': makePortal
    };




function makeEntity(blob) {
    // ugly hack for XM
    if (typeof blob === 'string') {
        blob = [blob];
    }
    var guid    = blob[0],
        matches = guid.match(/^[0-9a-f]+\.([0-9a-f]+)$/),
        suffix  = '',
        factory = null;

    if (!matches) {
        console.log('cannot parse guid', guid, blob);
        return;
    }

    suffix = matches[1];

    factory = factoryMappings[suffix];

    if (!factory) {
        console.log('missing factory for suffix', suffix, blob);
        return;
    }

    return factory(blob);
}
module.exports = makeEntity;
