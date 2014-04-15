var AbstractMoveCommand = require('../AbstractMoveCommand')
  , util = require('util')

module.exports = BuildCityCommand;
util.inherits(BuildCityCommand, AbstractMoveCommand)

function BuildCityCommand(gameId, playerIndex, cityLocation, isFree) {
  AbstractMoveCommand.call(this, gameId);
  this.playerIndex = playerIndex;
  this.cityLocation = cityLocation;
  this.isFree = isFree;
}
BuildCityCommand.params = ['playerIndex', 'vertexLocation', 'free'];
BuildCityCommand.optional = ['type'];
BuildCityCommand.logMessage = '{{name}} built a city';

BuildCityCommand.prototype.executeOnGame = function (game) {

	game.buildCity(this.playerIndex, this.cityLocation, this.isFree);

}

