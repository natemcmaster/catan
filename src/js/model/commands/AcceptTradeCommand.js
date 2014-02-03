var AbstractCommand = require('./AbstractCommand');

var playerID;
var willAccept;

function AcceptTradeCommand(_playerID, _willAccept){

	playerID = _playerID;
	willAccept = _willAccept;

	AcceptTradeCommand.AbstractCommand.url = '/moves/acceptTrade';
}
AcceptTradeCommand.prototype = new AbstractCommand();

AcceptTradeCommand.prototype.getData = function(){

	var returnObject = {'type':'acceptTrade',
						'playerIndex':playerID,
						'willAccept':willAccept};

	return returnObject;
	
}
