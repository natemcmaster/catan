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
	gameRoom.registerUser(this.username, this.password, function (err, data) {
    if (err) return callback(err)
    if (!data) {
      callback('Username already in use', null);
    } else {
      callback(null, {
        playerID: data.playerID,
        username: data.username,
        password: data.password,
      });
      this.logger.log('Create new user: ' + this.username);
    }
  });
}

