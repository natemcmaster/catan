var model = require('../src/server/model');
var logger = require('../src/server/resources').FileLogger;
var repo = require('../src/server/repo');
var DAO = require('../src/server/dao.js')

function flatten(obj, d) {
	d = d || {};
	for (var x in obj) {
		if (typeof obj[x] === 'object') {
			flatten(obj[x], d);
		} else if(typeof obj[x] === 'function'){
			d[x] = obj[x];
		}
	}
	return d;
}

var runtime = flatten(model);
var memory = flatten(repo.mem);

module.exports = function _setup_injection(inj){
  inj.map(runtime);
  inj.mapSingleton(memory); // store everything in memory
  inj.singleton('Logger',logger);
  inj.register('DAO', DAO);
}
