var model = require('./model');
var logger = require('./resources').ConsoleLogger;

function flatten(obj, d) {
    d = d || {};
    for (var x in obj) {
        if (typeof obj[x] === 'object') {
            flatten(obj[x], d);
        } else if (typeof obj[x] === 'function') {
            d[x] = obj[x];
        }
    }
    return d;
}

var runtime = flatten(model);

module.exports = function _setup_injection(inj) {
    inj.map(runtime);
    inj.singleton('Logger', logger);
}
