var AbstractCommand = require('../AbstractCommand')
  , util = require('util')

module.exports = ListGamesCommand

util.inherits(ListGamesCommand, AbstractCommand);


function ListGamesCommand(){


}


ListGamesCommand.prototype.execute = function(gameRoom){

	gameRoom.listGames();
}