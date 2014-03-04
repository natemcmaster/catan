'use strict';

module.exports = UserCtrl;

var BaseCtrl = require('./BaseCtrl');

function UserCtrl(app, model) {
	BaseCtrl.call(this, app, model);

}
UserCtrl.prototype = Object.create(BaseCtrl);
UserCtrl.constructor = UserCtrl;

UserCtrl.prototype.assignRoutes = function(app) {
	app.post('/user/login', this.login.bind(this));
	app.post('/user/register', this.register.bind(this));
}

UserCtrl.prototype.login = function(q, r) {
	r.cookie('catan.user',JSON.stringify({
		"name":"Sam",
		"password":"sam",
		"playerID": "0"
	}),{
		path:'/'
	});
	r.send(200);
}

UserCtrl.prototype.register = function(q, r){
	r.cookie('catan.user',encodeURIComponent(JSON.stringify({
		authentication:12334567,
		name:'Sam',
		password:'sam',
		playerID: 0
	})),{
		path:'/'
	});

	r.send(200);
}