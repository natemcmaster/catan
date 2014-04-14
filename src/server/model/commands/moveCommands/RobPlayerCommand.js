var AbstractMoveCommand = require('../AbstractMoveCommand')
  , util = require('util')

module.exports = RobPlayerCommand


util.inherits(RobPlayerCommand, AbstractMoveCommand);

function RobPlayerCommand(gameID, playerIndex, victimIndex, location){
	AbstractMoveCommand.call(this,gameID);	

	this.playerIndex = playerIndex;
	this.victimIndex = victimIndex;
	this.location = location;
	if(victimIndex < 0)
		this.logMessage = '{{name}} moved the robber';
	else
		this.logMessage = '{{name}} robbed {{victim}}';
}

RobPlayerCommand.params = ['playerIndex','victimIndex','location'];
RobPlayerCommand.optional = ['type'];

RobPlayerCommand.prototype.executeOnGame = function(game){
	this.randomType = game.robPlayer(this.playerIndex, this.victimIndex, this.location);
}

RobPlayerCommand.prototype.replayOnGame = function (game) {
	game.robPlayer(this.playerIndex, this.victimIndex, this.location, this.randomType);
}

