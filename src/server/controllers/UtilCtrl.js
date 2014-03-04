'use strict';

module.exports = UtilCtrl;

var BaseCtrl = require('./BaseCtrl');

function UtilCtrl (app,model) {
	BaseCtrl.call(this,app,model);
}

UtilCtrl.prototype = Object.create(BaseCtrl);
UtilCtrl.constructor = UtilCtrl;

UtilCtrl.prototype.assignRoutes = function(app){
	app.post('/util/changeLogLevel',this.changeLogLevel.bind(this));
}

UtilCtrl.prototype.changeLogLevel = function(q,r){
	r.send('Success');
}