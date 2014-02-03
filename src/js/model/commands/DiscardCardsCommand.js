var AbstractCommand = require('./AbstractCommand');

var playerID;
var brick;
var ore;
var sheep;
var wheat;
var wood;

function DiscardCardsCommand(_playerID, _brick, _ore, _sheep, _wheat, _wood){

	playerID = _playerID;
	brick = _brick;
	ore = _ore;
	sheep = _sheep;
	wheat = _wheat;
	wood = _wood;
	
	

	DiscardCardsCommand.AbstractCommand.url = '/moves/discardCards';
}
DiscardCardsCommand.prototype = new AbstractCommand();

DiscardCardsCommand.prototype.getData = function(){

	var returnObject = {'type': 'discardCards',
						'playerIndex': playerID,
						'discardedCards':{ 
							'brick': brick,
							'ore': ore,
							'sheep': sheep,
							'wheat': wheat,
							'wood': wood,
							}

						};

	return returnObject;
	
}
