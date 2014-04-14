module.exports=PlayMonumentCommand;

/**
 * 
 * @module catan.model.commands
 * @namespace model
 */

var AbstractCommand = require('./AbstractCommand');
/**
@class PlayMonumentCommand
@constructor 
@param {int} playerIndex the index (NOT ID) of the player playing the victory point card
**/
function PlayMonumentCommand(playerIndex){
	this.playerIndex = playerIndex;
}

PlayMonumentCommand.prototype = new AbstractCommand();
PlayMonumentCommand.prototype._name = 'PlayMonument';

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getData
@return {object} data object for server
**/
PlayMonumentCommand.prototype.getData = function(){

	return {
		"type":"Monument",
		"playerIndex":this.playerIndex
	};
};
