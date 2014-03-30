var AbstractCommand = require('../AbstractCommand'),
	util = require('util');

module.exports = RegisterCommand

function RegisterCommand(username, password, $Logger) {
	AbstractCommand.call(this, $Logger);
	this.username = username;
	this.password = password;
}
util.inherits(RegisterCommand, AbstractCommand);

RegisterCommand.prototype.execute = function(gameRoom, callback) {
	if (!this.username || this.username.length == 0)
		return callback('Invalid parameters')
	var d = gameRoom.registerUser(this.username, this.password);
	if (!d) {
		callback('Username already in use', null);
	} else {
		callback(null, {
			playerID: d.playerID,
			username: d.username,
			password: d.password,
		});
		this.logger.log('Create new user: ' + this.username);
	}

}
