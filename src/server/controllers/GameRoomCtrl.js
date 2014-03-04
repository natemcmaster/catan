'use strict';

module.exports = GameRoomCtrl;

var fs = require('fs');
var path = require('path');
var sampleJson = JSON.parse(fs.readFileSync(path.join(__dirname, './_sampledata.json')));


var BaseCtrl = require('./BaseCtrl');

function GameRoomCtrl(app, model) {
	BaseCtrl.call(this, app, model);

}
GameRoomCtrl.prototype = Object.create(BaseCtrl);
GameRoomCtrl.constructor = GameRoomCtrl;

GameRoomCtrl.prototype.assignRoutes = function(app) {
	app.get('/games/list', this.listAll.bind(this));
	app.post('/games/create', this.create.bind(this));
	app.post('/games/join', this.join.bind(this));

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