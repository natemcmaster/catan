var AbstractMoveCommand = require('./AbstractMoveCommand')
  , util = require('util')

moduel.exports = BuildRoadCommand


util.inherits(BuildRoadCommand, AbstractMoveCommand);

function BuildRoadCommand(gameID, playerIndex, roadLocation, isFree){
	AbstractMoveCommand.call(this,gameID);	

	this.playerIndex = playerIndex;
  // roadLocation: {x: 0, y: 0}
	this.roadLocation = roadLocation;
	this.isFree = !! isFree;

}

BuildRoadCommand.prototype.executeOnGame = function(game){

	game.buildRoad(this.playerIndex, this.roadLocation, this.isFree);

}
