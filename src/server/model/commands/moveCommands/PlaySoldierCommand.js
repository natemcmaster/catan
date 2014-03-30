var AbstractMoveCommand = require('./AbstractMoveCommand')
  , util = require('util')

module.exports = PlaySoldierCommand


util.inherits(PlaySoldierCommand, AbstractMoveCommand);

function PlaySoldierCommand(gameID, playerIndex, victimIndex, robberSpot){
	AbstractMoveCommand.call(this,gameID);	

	this.playerIndex = playerIndex;
	this.victimIndex = victimIndex;
	this.robberSpot = robberSpot;

}

PlaySoldierCommand.params = ['playerIndex', 'victimIndex', 'location'];
PlaySoldierCommand.optional = ['type'];
PlaySoldierCommand.logMessage = '{{name}} played the soldier card';

PlaySoldierCommand.prototype.executeOnGame = function(game){

	game.playSoldier(this.playerIndex, this.victimIndex, this.robberSpot);

}