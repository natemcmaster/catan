var AbstractCommand = require('./AbstractCommand');

var playerID;
var message;

function SendChatCommand(_playerID, _message){
	playerID = _playerID;
	message = _message;

	

	SendChatCommand.AbstractCommand.url = '/moves/sendChat';
}
SendChatCommand.prototype = new AbstractCommand();

SendChatCommand.prototype.getData = function(){

	var returnObject = {'type':'sendChat',
						'playerIndex': playerID.
						'content': message};

	return returnObject;

	
}
