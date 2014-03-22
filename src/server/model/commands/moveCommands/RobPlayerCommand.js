var AbstractMoveCommand = require('./AbstractMoveCommand')
  , util = require('util')

module.exports = RobPlayerCommand


util.inherits(RobPlayerCommand, AbstractMoveCommand);

function RobPlayerCommand(gameID, playerIndex, victimIndex, robberSpot){
	AbstractMoveCommand.call(this,gameID);	

	this.playerIndex = playerIndex;
	this.victimIndex = victimIndex;
	this.robberSpot = robberSpot;

}

RobPlayerCommand.prototype.executeOnGame = function(game){

	game.robPlayer(this.playerIndex, this.victimIndex, this.robberSpot);

}