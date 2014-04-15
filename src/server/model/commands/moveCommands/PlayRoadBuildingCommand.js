var AbstractMoveCommand = require('../AbstractMoveCommand')
  , util = require('util')

module.exports = PlayRoadBuildingCommand


util.inherits(PlayRoadBuildingCommand, AbstractMoveCommand);

function PlayRoadBuildingCommand(gameID, playerIndex, spot1, spot2){
	AbstractMoveCommand.call(this,gameID);	

	this.playerIndex = playerIndex;
	console.log("PlayerIndex: " + this.playerIndex);
	this.location1 = spot1;
	this.location2 = spot2;

}

PlayRoadBuildingCommand.params = ['playerIndex', 'spot1', 'spot2'];
PlayRoadBuildingCommand.optional = ['type'];
PlayRoadBuildingCommand.logMessage = '{{name}} build two roads';

PlayRoadBuildingCommand.prototype.executeOnGame = function(game){

	game.playRoadBuilding(this.playerIndex, this.location1, this.location2);

}
