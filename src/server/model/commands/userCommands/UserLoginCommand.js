var AbstractMoveCommand = require('../AbstractCommand')
  , util = require('util')

moduel.exports = LoginCommand

util.inherits(LoginCommand, AbstractCommand);


function LoginCommand(username, password){

	this.username = username;
	this.password = password;

}


LoginCommand.prototype.execute = function(gameRoom){

	gameRoom.userLogin(this.username, this.password);

}