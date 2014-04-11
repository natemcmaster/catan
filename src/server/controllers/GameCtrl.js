'use strict';

module.exports = GameCtrl;

var fs = require('fs'),
	path = require('path'),
  debug = require('debug')('catan:ctrl:game'),
	util = require('util');


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
	debug('Getting model for game', q.gameID);
	q.gameRoom.getGameModel(q.gameID, function (err, game) {
    if (err) return r.send(500, err.message + '\n' + err.stack)
    var data = game.toJSON()
    r.json(data);
  });
}

GameCtrl.prototype.listCommands = function(q, r) {
	r.json([]);
}

GameCtrl.prototype.listAi = function(q, r) {
	// we don't support AI
	r.json([]);
}

GameCtrl.prototype.reset = function(q, r) {
  q.gameRoom.resetGame(q.gameID, function (err, game) {
    if (err) return r.send(500, err.message + '\n' + err.stack)
    r.json(game.toJSON())
  })
}

GameCtrl.prototype.executeCommands = function(q, r) {
	//game model
}

GameCtrl.prototype.addAi = function(q, r) {
	r.send(418);
}

