var AbstractMoveCommand = require('./AbstractMoveCommand')
  , util = require('util')

module.exports = RobPlayerCommand


util.inherits(RobPlayerCommand, AbstractMoveCommand);

function RobPlayerCommand(gameID, playerIndex, victimIndex, location){
	AbstractMoveCommand.call(this,gameID);	

	this.playerIndex = playerIndex;
	this.victimIndex = victimIndex;
	this.location = location;

}

RobPlayerCommand.params = ['playerIndex','victimIndex','location'];
RobPlayerCommand.optional = ['type'];

RobPlayerCommand.prototype.executeOnGame = function(game){

	game.robPlayer(this.playerIndex, this.victimIndex, this.location);

}