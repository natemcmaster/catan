exports = module.exports;
var model = require('./model');

function flatten(obj, d) {
	d = d || {};
	for (var x in obj) {
		if (typeof obj[x] === 'object') {
			flatten(obj[x], d);
		} else {
			d[x] = obj[x];
		}
	}
	return d;
}

exports.runtime = flatten(model);

exports.runtime.SmokeTest = require('./resources').EchoTest;
exports.runtime.Logger = require('./resources').ConsoleLogger;

var repo = require('./repo');
exports.repo = {
	memory: flatten(repo.mem)
};