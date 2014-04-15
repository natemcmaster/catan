var AbstractCommand = require('../AbstractCommand'),
	util = require('util')

	module.exports = CreateGameCommand

	util.inherits(CreateGameCommand, AbstractCommand);

function CreateGameCommand(title, randomTiles, randomNumber, randomPorts, $Logger) {
	AbstractCommand.call(this, $Logger);
	this.title = title;
	this.randomTiles = randomTiles;
	this.randomNumber = randomNumber;
	this.randomPorts = randomPorts;
}

CreateGameCommand.prototype.execute = function(gameRoom, callback) {
	gameRoom.createGame(this.title, this.randomTiles, this.randomNumber, this.randomPorts, function (err, data) {
    if (err) return callback(err)
    if (!data) {
      callback('Could not create game', data);
    } else {
      callback(null,data);
      this.logger.log('Created game: id = ' + data.id);
    }
  }.bind(this));
}
