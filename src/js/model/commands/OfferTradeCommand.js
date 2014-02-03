/**
 * 
 * @module catan.model.commands
 * @namespace model
 */

var AbstractCommand = require('./AbstractCommand');


function OfferTradeCommand(playerID, reciever, brick, ore, sheep, wheat, wood){
	this.playerID = playerID;
	this.reciever = reciever;
	this.brick = brick;
	this.ore = ore;
	this.sheep = sheep;
	this.wheat = wheat;
	this.wood = wood;

	OfferTradeCommand.AbstractCommand.url = '/moves/offerTrade';
};

OfferTradeCommand.prototype = new AbstractCommand();

OfferTradeCommand.prototype.getData = function(){

	return {'type' : 'offerTrade',
						'playerIndex' : this.playerID,
						'offer' : {
							'brick' : this.brick,
							'ore' : this.ore,
							'sheep' : this.sheep,
							'wheat' : this.wheat,
							'wood' : this.wood 
							},
						'reciever' : this.reciever};
};
