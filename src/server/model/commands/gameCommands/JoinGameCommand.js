var AbstractMoveCommand = require('../AbstractMoveCommand')
  , util = require('util')

module.exports = JoinGameCommand

util.inherits(JoinGameCommand, AbstractMoveCommand);


function JoinGameCommand(gameID, playerID, color){
  console.log(gameID, playerID, color)
	AbstractMoveCommand.call(this, gameID);

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
  /*
	gameRoom.joinGame(this.playerID, this.color, this.gameID, function (err, success) {
    if (err) return callback(err)
    if (success instanceof Error) {
      return callback(success);
    }
    if(!success){
      callback(true,'Could not join game');
      this.logger.warn('PlayerID '+this.playerID+' joined game '+this.gameID);
    }
    else{
      callback(false,true);
      this.logger.log('PlayerID '+this.playerID+' joined game '+this.gameID);
    }
  });
  */
}
