var AbstractMoveCommand = require('./AbstractMoveCommand')
  , util = require('util')

moduel.exports = PlayYearOfPlentyCommand


util.inherits(PlayYearOfPlentyCommand, AbstractMoveCommand);

function PlayYearOfPlentyCommand(gameID, playerIndex, resource1, resource2){
	AbstractMoveCommand.call(this,gameID);	

	this.playerIndex = playerIndex;
	this.resource1 = resource1;
	this.resource2 = resource2;

}

PlayYearOfPlentyCommand.prototype.executeOnGame = function(game){

	game.playYearOfPlenty(this.playerIndex, this.resource1, this.resource2);

}