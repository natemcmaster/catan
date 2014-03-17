'use strict';

module.exports = GameCtrl;

var fs = require('fs');
var path = require('path');
var sampleJson = JSON.parse(fs.readFileSync(path.join(__dirname, './_sampledata.json')));


var BaseCtrl = require('./BaseCtrl');

function GameCtrl(app, model) {
	BaseCtrl.call(this, app, model);
}
GameCtrl.prototype = Object.create(BaseCtrl);
GameCtrl.constructor = GameCtrl;

GameCtrl.prototype.assignRoutes = function(app) {
	app.get('/game/model', this.getModel.bind(this));
	app.get('/game/commands', this.listCommands.bind(this));
	app.get('/game/listAI', this.listAi.bind(this));

	app.post('/game/reset', this.reset.bind(this));
	app.post('/game/commands', this.executeCommands.bind(this));
	app.post('/game/addAI', this.addAi.bind(this));
}

GameCtrl.prototype.getModel = function(q, r) {
	r.json(sampleJson.model);
}

GameCtrl.prototype.listCommands = function(q, r) {
	r.json([]);
}

GameCtrl.prototype.listAi = function(q, r) {
	r.json(['LARGEST_ARMY']);
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
