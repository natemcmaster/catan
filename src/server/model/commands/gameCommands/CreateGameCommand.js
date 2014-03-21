var AbstractCommand = require('../AbstractCommand')
  , util = require('util')

module.exports = CreateGameCommand

util.inherits(CreateGameCommand, AbstractCommand);

function CreateGameCommand(name, randomTiles, randomNumber, randomPorts){
	this.name = name;
	this.randomTiles = randomTiles;
	this.randomNumber = randomNumber;
	this.randomPorts = randomPorts;
}

CreateGameCommand.params = ['name', 'randomTiles', 'randomNumber', 'randomPorts'];

CreateGameCommand.prototype.execute = function(gameRoom){
	this.id = gameRoom.createGame(this.name, this.randomTiles, this.randomNumber, this.randomPorts);
}

CreateGameCommand.prototype.response = function (gameRoom) {
  return gameRoom.gameSummaryByID(this.id);
}

