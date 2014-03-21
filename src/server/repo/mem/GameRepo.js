module.exports = MemoryGameRepo;

var _ = require('underscore');
var sampledata = require('./_sampledata.json');

function MemoryGameRepo($GameModel){
	this.gameConstruct = $GameModel;
	this.games=[
		{
			id: 0,
			title:'Sample Game',
			model: $GameModel(sampledata.model)
		}
	];
	this.nextId = -1;
	for (var i = this.games.length - 1; i >= 0; i--) {
		var id=this.games[i].id;
		if(id > this.nextId)
			this.nextId = id + 1;
	};
}

MemoryGameRepo.prototype.create = function(title, randomTiles, randomNumber, randomPorts){
	var model = this.gameConstruct(sampledata.model);
	var game = {
		id: (this.nextId++),
		title: title,
		model: model
	};
	this.games.push(game);
	return game;
}

MemoryGameRepo.prototype.getAll = function(){
	return this.games;
}