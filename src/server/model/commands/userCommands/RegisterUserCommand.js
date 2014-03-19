var AbstractMoveCommand = require('../AbstractCommand')
  , util = require('util')

moduel.exports = RegisterCommand

util.inherits(RegisterCommand, AbstractCommand);


function RegisterCommand(username, password){

	this.username = username;
	this.password = password;
}


RegisterCommand.prototype.execute = function(gameRoom){

	gameRoom.registerUser(this.username, this.password);

}