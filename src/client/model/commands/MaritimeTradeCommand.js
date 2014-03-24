module.exports = MaritimeTradeCommand;
/**
 *
 * @module catan.model.commands
 * @namespace model
 */

var AbstractCommand = require('./AbstractCommand');

/**
 * Sends command to server to make a maritime trade
 * @class MaritimeTradeCommand
 * @constructor
 * @param {int} playerIndex         Player who is using the card
 * @param {int} ratio      How many inputs for one output?
 * @param {ResourceType} inputResource  What type of resource are you trading?
 * @param {ResourceType} outputResource What type of resource do you want?
 */
function MaritimeTradeCommand(playerIndex, ratio, inputResource, outputResource) {
	this.playerIndex = playerIndex;
	this.ratio = ratio;
	this.inputResource = inputResource;
	this.outputResource = outputResource;
}

MaritimeTradeCommand.prototype = new AbstractCommand();

MaritimeTradeCommand.prototype._name = 'MaritimeTrade';

/**
 * Returns data to send for the proxy
 * @method getData
 * @return {object} data
 */
MaritimeTradeCommand.prototype.getData = function() {
	return {
		"type": "maritimeTrade",
		"playerIndex": this.playerIndex,
		"ratio": this.ratio,
		"inputResource": this.inputResource,
		"outputResource": this.outputResource
	}
};
