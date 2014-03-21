'use strict';

module.exports = GameRoomCtrl;

var fs = require('fs');
var path = require('path'),
	util = require('util');
var sampleJson = JSON.parse(fs.readFileSync(path.join(__dirname, './_sampledata.json')));


var BaseCtrl = require('./BaseCtrl');

function GameRoomCtrl(app, inj) {
	BaseCtrl.call(this, app, inj);
}
util.inherits(GameRoomCtrl,BaseCtrl);

GameRoomCtrl.prototype.assignRoutes = function(app,h) {
	app.get('/games/list', h(this.listAll));
	app.post('/games/create', h(this.create));
	app.post('/games/join', h(this.join));

}

GameRoomCtrl.prototype.listAll = function(q, r) {
	r.json(sampleJson.gamesList);
}

GameRoomCtrl.prototype.create = function(q, r) {
	r.json(sampleJson.gameCreate);
}

GameRoomCtrl.prototype.join = function(q, r) {
	r.cookie('catan.game', 0, {
		path: '/'
	});
	r.send(200);
}