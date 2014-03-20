'use strict';

module.exports = GameRoomCtrl;

var fs = require('fs');
var path = require('path');
var util = require('util');

var BaseCtrl = require('./BaseCtrl');

util.inherits(GameRoomCtrl, BaseCtrl);
function GameRoomCtrl(app, model) {
	BaseCtrl.call(this, app, model);
}

GameRoomCtrl.prototype.assignRoutes = function(app) {
  BaseCtrl.prototype.assignRoutes.call(this, app);
	app.post('/games/join', this.join.bind(this));
}

GameRoomCtrl.prototype.commands = {
  '/games/create': CreateGameCommand,
}

GameRoomCtrl.prototype.getters = {
  '/games/list': function (req, res) {
    res.json(req.gameRoom.listAll());
  }
}

GameRoomCtrl.prototype.join = function(q, r) {
	r.cookie('catan.game', 0, {
		path: '/'
	});
	r.send(200);
}

/*
GameRoomCtrl.prototype.create = function(q, r) {
	r.json(sampleJson.gameCreate);
}
*/

