var AbstractCommand = require('../AbstractCommand'),
	util = require('util');

module.exports = LoginCommand;

function LoginCommand(username, password, $Logger) {
	AbstractCommand.call(this,$Logger);
	this.username = username;
	this.password = password;
}

util.inherits(LoginCommand, AbstractCommand);

LoginCommand.prototype.execute = function(gameRoom, callback) {
	var d = gameRoom.login(this.username, this.password);
	if (!d){
		callback(true, null);
		return;
	}
	callback(null, {
		playerID: d.playerID,
		username: d.username,
		password: d.password,
	});
	this.logger.log('User logged in: ' + this.username);
}