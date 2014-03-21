module.exports = MemoryGameRepo;

var sampledata = require('./_sampledata.json');

function MemoryGameRepo($GameModel){
	this.gameConstruct = $GameModel;
	this.games=[
		$GameModel(sampledata.model), // empty game
	];
}

MemoryGameRepo.prototype.getAll = function(){
	return this.games;
}