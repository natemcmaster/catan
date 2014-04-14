'use strict';

module.exports = UtilCtrl;

var BaseCtrl = require('./BaseCtrl'),
	util = require('util');

function UtilCtrl (app,model) {
	BaseCtrl.call(this,app,model);
}
util.inherits(UtilCtrl,BaseCtrl);

UtilCtrl.prototype.assignRoutes = function(app,h){
	app.post('/util/changeLogLevel',h(this.changeLogLevel));
}

UtilCtrl.prototype.changeLogLevel = function(q,r,$Logger){
	$Logger().setLogLevel(q.param('logLevel'),function(err,data){
		if(err) return r.send(400, data);
		r.send(200,'Log set to '+data);
	});
}
