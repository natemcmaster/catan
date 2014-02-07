/**
 * 
 * @module catan.model.commands
 * @namespace model
 */

var AbstractCommand = require('./AbstractCommand');

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@class OfferTradeCommand
@constructor 
@param {int} playerID the ID of the player offer the trade
@param {int} reciever the ID of the player recieving the offer
@param {int} brick number of brick to be tradeded
@param {int} ore number of ore to be tradeded
@param {int} sheep number of sheep to be tradeded
@param {int} wheat number of wheat to be tradeded
@param {int} wood number of wood to be tradeded
**/
function OfferTradeCommand(playerID, reciever, brick, ore, sheep, wheat, wood){
	this.playerID = playerID;
	this.reciever = reciever;
	this.brick = brick;
	this.ore = ore;
	this.sheep = sheep;
	this.wheat = wheat;
	this.wood = wood;
}

OfferTradeCommand.prototype = new AbstractCommand();
OfferTradeCommand.prototype.url = '/moves/offerTrade';

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getData
@return {JSON} returns the JSON object formatted as the server will want it
**/
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
