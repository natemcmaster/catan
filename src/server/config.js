var model = require('./model');
var logger = require('./resources').ConsoleLogger;
var repo = require('./repo');

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
var repoPlugins = {
    memory: flatten(repo.mem),
    sqlite: flatten(repo.sqlite),
    file: flatten(repo.file),
};

module.exports = function _setup_injection(inj, pl) {
    pl = pl || 'memory';
    if (!repoPlugins[pl])
        throw new TypeError('Invalid persistence option: ' + pl);
    inj.map(runtime);
    inj.mapSingleton(repoPlugins[pl]);
    inj.singleton('Logger', logger);
}