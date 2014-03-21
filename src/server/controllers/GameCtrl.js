'use strict';

module.exports = GameCtrl;

var fs = require('fs'),
	path = require('path'),
	util = require('util');
var sampleJson = JSON.parse(fs.readFileSync(path.join(__dirname, './_sampledata.json')));


var BaseCtrl = require('./BaseCtrl');

function GameCtrl(app, inj) {
	BaseCtrl.call(this, app, inj);
}
util.inherits(GameCtrl,BaseCtrl);

GameCtrl.prototype.assignRoutes = function(app, h) {
	app.get('/game/model', h(this.getModel));
	app.get('/game/commands', h(this.listCommands));
	app.get('/game/listAI', h(this.listAi));

	app.post('/game/reset', h(this.reset));
	app.post('/game/commands', h(this.executeCommands));
	app.post('/game/addAI', h(this.addAi));
}

GameCtrl.prototype.getModel = function(q, r) {
	r.json(sampleJson.model);
}

GameCtrl.prototype.listCommands = function(q, r) {
	r.json([]);
}

GameCtrl.prototype.listAi = function(q, r) {
	// we don't support AI
	r.json([]);
}

GameCtrl.prototype.reset = function(q, r) {
	r.json(sampleJson.model);
}

GameCtrl.prototype.executeCommands = function(q, r) {
	r.json(sampleJson.model);
}

GameCtrl.prototype.addAi = function(q, r) {
	r.send(200);
}