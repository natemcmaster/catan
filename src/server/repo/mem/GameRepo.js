module.exports = MemoryGameRepo;
var CatanError = require('../../../common').Errors.CatanError;
var _ = require('underscore');
var sampledata = require('./_sampledata.json');

function MemoryGameRepo($GameModel) {
	this.constructGame = $GameModel;
	this.games = {};
	this.games[0] = {
		id: 0,
		title: 'Sample Game',
		model: $GameModel(sampledata.model)
	};
	this.nextId = 1;
}

MemoryGameRepo.prototype.create = function(title, randomTiles, randomNumber, randomPorts) {
	var model = this.constructGame(sampledata.blank);
	var game = {
		id: (this.nextId++),
		title: title,
		model: model
	};
	this.games[game.id] = game;
	return game;
}

MemoryGameRepo.prototype.update = function(key, game, property) {
	if (!this.games[key])
		throw new CatanError('Game does not exist');
	this.games[key] = game;
	return true;
};

MemoryGameRepo.prototype.read = function(key) {
	return this.games[key];
}

MemoryGameRepo.prototype.delete = function(key) {
	delete this.games[key];
	return true;
}

MemoryGameRepo.prototype.getAll = function() {
	return _(this.games).toArray();
}