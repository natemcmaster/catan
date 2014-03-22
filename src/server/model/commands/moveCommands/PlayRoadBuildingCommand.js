var AbstractMoveCommand = require('./AbstractMoveCommand')
  , util = require('util')

module.exports = PLayRoadBuildingCommand


util.inherits(PLayRoadBuildingCommand, AbstractMoveCommand);

function PLayRoadBuildingCommand(gameID, playerIndex, location1, location2){
	AbstractMoveCommand.call(this,gameID);	

	this.playerIndex = playerIndex;
	this.location1 = location1;
	this.location2 = location2;

}

PLayRoadBuildingCommand.prototype.executeOnGame = function(game){

	game.playRoadBuildin(this.playerIndex, this.location1, this.location2);

}