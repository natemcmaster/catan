var AbstractCommand = require('../AbstractCommand'),
	util = require('util');

module.exports = ListGamesCommand

function ListGamesCommand($Logger) {
	AbstractCommand.call(this, $Logger);
}
util.inherits(ListGamesCommand, AbstractCommand);

ListGamesCommand.prototype.execute = function(gameRoom, callback) {
	var games = gameRoom.listGames();
	callback(null, games);
	this.logger.info('list all games. Count = ' + games.length);
}