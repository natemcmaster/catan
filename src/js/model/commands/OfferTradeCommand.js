var AbstractCommand = require('./AbstractCommand');

var playerID;
var reciever;
var brick;
var ore;
var sheep;
var wheat;
var wood;

function OfferTradeCommand(_playerID, _reciever, _brick, _ore, _sheep, _wheat, _wood){
	playerID = _playerID;
	reciever = _reciever;
	brick = _brick;
	ore = _ore;
	sheep = _sheep;
	wheat = _wheat;
	wood = _wood;

	

	OfferTradeCommand.AbstractCommand.url = '/moves/offerTrade';
}
OfferTradeCommand.prototype = new AbstractCommand();

OfferTradeCommand.prototype.getData = function(){

	var returnObject = {'type' : 'offerTrade',
						'playerIndex' : playerID,
						'offer' : {
							'brick' : brick,
							'ore' : ore,
							'sheep' : sheep,
							'wheat' : wheat,
							'wood' : wood 
							},
						'reciever' : reciever};
	return returnObject;

	
}
