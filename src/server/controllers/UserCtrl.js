'use strict';

module.exports = UserCtrl;

var BaseCtrl = require('./BaseCtrl');
  , util = require('util')

util.inherits(UserCtrl, BaseCtrl);
function UserCtrl(app, model) {
	BaseCtrl.call(this, app, model);
}

UserCtrl.prototype.assignRoutes = function(app) {
	app.post('/user/login', this.login.bind(this));
	app.post('/user/register', this.register.bind(this));
}

UserCtrl.prototype.cookieData = function (name, password, id) {
  return {
    name: name,
    password: password,
    playerID: id
  }
}

UserCtrl.prototype.setCookie = function (res, username, password, id) {
  var data = this.cookieData(username, password, id)
    , raw = encodeURIComponent(JSON.stringify(data));
	r.cookie('catan.user', raw, {path:'/'});
}

UserCtrl.prototype.login = function(q, r) {
  var username = q.param('username')
    , password = q.param('password');
  var id = q.gameRoom.checkLogin(username, password);
  if (!id) return r.send(401, 'Invlalid login');
  this.setCookie(r, username, password, id);
	r.send(200);
}

UserCtrl.prototype.register = function(q, r){
  var username = q.param('username')
    , password = q.param('password');
  var id = q.gameRoom.registerUser(username, password);
  this.setCookie(r, username, password, id);
	r.send(200);
}

