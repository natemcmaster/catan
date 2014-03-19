var AbstractMoveCommand = require('./AbstractMoveCommand')
  , util = require('util')

moduel.exports = PlaySoldierCommand


util.inherits(PlaySoldierCommand, AbstractMoveCommand);

function PlaySoldierCommand(gameID, playerIndex, victimIndex, robberSpot){
	AbstractMoveCommand.call(this,gameID);	

	this.playerIndex = playerIndex;
	this.victimIndex = victimIndex;
	this.robberSpot = robberSpot;

}

PlaySoldierCommand.prototype.executeOnGame = function(game){

	game.playSoldier(this.playerIndex, this.victimIndex, this.robberSpot);

}