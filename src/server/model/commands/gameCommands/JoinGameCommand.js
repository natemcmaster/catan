var AbstractMoveCommand = require('../AbstractMoveCommand')
  , util = require('util')

module.exports = JoinGameCommand

util.inherits(JoinGameCommand, AbstractMoveCommand);


function JoinGameCommand(gameID, playerID, color,$Logger){
	AbstractMoveCommand.call(this, gameID,$Logger);

	this.playerID = playerID;
	this.color = color;
}

JoinGameCommand.params = ['gameID', 'playerID', 'color'];

JoinGameCommand.prototype.response = function () {
}

JoinGameCommand.prototype.executeOnGame = function (game, users) {
  var result = game.join(this.playerID, this.color, users)
  if (!result) {
    console.warn('PlayerID '+this.playerID+' failed to join game '+this._gameid);
  } else {
    console.log('PlayerID '+this.playerID+' joined game '+this._gameid);
  }
  return result
}
