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
util.inherits(GameRoomCtrl, BaseCtrl);

GameRoomCtrl.prototype.assignRoutes = function(app, h) {
	app.get('/games/list', h(this.listAll));
	app.post('/games/create', h(this.create));
	app.post('/games/join', h(this.join));
}

GameRoomCtrl.prototype.listAll = function(q, r, $ListGamesCommand) {
	q.authorize();
	$ListGamesCommand().execute(q.gameRoom, function(err, data) {
		if (err)
			throw new BaseCtrl.HttpError(404);
		r.json(data);
	})
}

GameRoomCtrl.prototype.create = function(q, r, $CreateGameCommand) {
	q.authorize();
	var name = q.param('name');
	if (!name)
		throw new BaseCtrl.HttpError(400, 'Missing name');

	$CreateGameCommand(name, !! q.param('randomHexes'), !! q.param('randomTiles'), !! q.param('randomtile'))
		.execute(q.gameRoom, function(err, data) {
			if (err)
				throw new BaseCtrl.HttpError(500, data);
			r.json(data);
		});
}

GameRoomCtrl.prototype.join = function(q, r, $JoinGameCommand) {
	q.authorize();
	var gameID = q.param('id');
	if (!gameID && gameID !== 0) {
		throw new BaseCtrl.HttpError(400, 'Missing game ID');
	}

	$JoinGameCommand(q.playerID, q.param('color'), gameID)
		.execute(q.gameRoom, function(err, data) {
			if (err)
				throw new BaseCtrl.HttpError(500, data);
			r.cookie('catan.game', gameID, {
				path: '/'
			});
			r.send(200);
		})
}
