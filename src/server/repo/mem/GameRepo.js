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
}

MemoryGameRepo.prototype.getAll = function(){
	return this.games;
}