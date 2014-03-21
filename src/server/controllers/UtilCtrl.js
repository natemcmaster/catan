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
	app.get('/smoke',h(this.smokeTest));
}

UtilCtrl.prototype.changeLogLevel = function(q,r){
	r.send('Success');
}

UtilCtrl.prototype.smokeTest = function(q,r,$SmokeTest){
	var t = $SmokeTest(q.query);
	r.json(t);
}