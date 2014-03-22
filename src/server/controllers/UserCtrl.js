'use strict';

module.exports = UserCtrl;

var BaseCtrl = require('./BaseCtrl'),
	util = require('util');

function UserCtrl(app, model) {
	BaseCtrl.call(this, app, model);

}
util.inherits(UserCtrl, BaseCtrl);

UserCtrl.prototype.assignRoutes = function(app, h) {
	app.post('/user/login', h(this.login));
	app.post('/user/register', h(this.register));
}

var setCookie = function(res, username, password, id) {
	var data = {
		username: username,
		password: password,
		playerID: id
	};
	var raw = JSON.stringify(data);
	res.cookie('catan.user', raw, {
		path: '/'
	});
}

UserCtrl.prototype.login = function(q, r, $UserLoginCommand) {
	$UserLoginCommand(q.param('username'), q.param('password'))
		.execute(q.gameRoom, function(err, data) {
			if (err) {
				throw new HttpError(401, 'Bad username or password');
			}
			setCookie(r, data.username, data.password, data.playerID);
			r.send(200);
		});
}

UserCtrl.prototype.register = function(q, r, $RegisterUserCommand) {
	$RegisterUserCommand(q.param('username'), q.param('password'))
		.execute(q.gameRoom, function(err, data) {
			if (err) {
				throw new HttpError(400, err);
			}
			setCookie(r, data.username, data.password, data.playerID);
			r.send(200);
		});
}