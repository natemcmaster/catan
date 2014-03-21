var AbstractCommand = require('../AbstractCommand')
  , util = require('util')

module.exports = RegisterCommand

util.inherits(RegisterCommand, AbstractCommand);


function RegisterCommand(username, password){

	this.username = username;
	this.password = password;
}


RegisterCommand.prototype.execute = function(gameRoom){

	gameRoom.registerUser(this.username, this.password);

}