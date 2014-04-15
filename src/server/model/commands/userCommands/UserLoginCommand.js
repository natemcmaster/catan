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
	gameRoom.login(this.username, this.password, function (err, data) {
    if (err) return callback(err)
    if (!data){
      callback(true, null);
      return;
    }
    callback(null, {
      playerID: data.playerID,
      username: data.username,
      password: data.password,
    });
    this.logger.log('User logged in: ' + this.username);
  }.bind(this));
}
