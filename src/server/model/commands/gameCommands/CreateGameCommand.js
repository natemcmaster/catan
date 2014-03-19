var AbstractMoveCommand = require('../AbstractCommand')
  , util = require('util')

moduel.exports = CreateGameCommand

util.inherits(CreateGameCommand, AbstractCommand);


function CreateGameCommand(name, randomTiles, randomNumber, randomPorts){

	this.name = name;
	this.randomTiles = randomTiles;
	this.randomNumber = randomNumber;
	this.randomPorts = randomPorts;

}


CreateGameCommand.prototype.execute = function(gameRoom){

	gameRoom.createGame(this.name, this.randomTiles, this.randomNumber, this.randomPorts);
}