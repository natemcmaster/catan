/**
 * 
 * @module catan.model.commands
 * @namespace model
 */

var AbstractCommand = require('./AbstractCommand');


function DiscardCardsCommand(playerID, brick, ore, sheep, wheat, wood){

	this.playerID = playerID;
	this.brick = brick;
	this.ore = ore;
	this.sheep = sheep;
	this.wheat = wheat;
	this.wood = wood;
	
	

	DiscardCardsCommand.AbstractCommand.url = '/moves/discardCards';
};

DiscardCardsCommand.prototype = new AbstractCommand();

DiscardCardsCommand.prototype.getData = function(){

	return {'type': 'discardCards',
			'playerIndex': this.playerID,
			'discardedCards':{ 
				'brick': this.brick,
				'ore': this.ore,
				'sheep': this.sheep,
				'wheat': this.wheat,
				'wood': this.wood,
				}

			};
	
};