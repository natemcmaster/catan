
var AbstractCommand = require('./AbstractCommand')
  , util = require('util')

module.exports = AbstractGameCommand;
util.inherits(AbstractGameCommand, AbstractCommand)

function AbstractGameCommand(gameid) {
  this._gameid = gameid;
}

AbstractGameCommand.prototype.execute = function (gameRoom) {
  var game = gameRoom.getGameModel(this._gameid);
  if (!game) return new Error('Game not found: ' + this._gameid);
  this.executeOnGame(game, gameRoom.users);
  game.data.revision += 1;
  this.logAction(game);
}

AbstractGameCommand.prototype.logAction = function(game){
	if(!this.logMessage)
		return;
	if(!this.playerIndex && this.playerIndex !== 0){
		return;
	}
	var name = game.getNameByIndex(this.playerIndex);
	var msg = this.logMessage.replace('{{name}}',name);
	if(this.victimIndex && this.victimIndex > 0){
		var victimName = game.getNameByIndex(this.victimIndex);
		msg = msg.replace('{{victim}}',victimName)
	}
	game.log.addEntry(name,msg);
}

AbstractGameCommand.prototype.executeOnGame = function (game) {
  throw new Error('This must be overridden');
}

AbstractGameCommand.prototype.response = function (room) {
  return room.getGameModel(this._gameid).toJSON()
}

