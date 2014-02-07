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
@param {int} playerID the ID of the player playing the victory point card
**/
function PlayMonumentCommand(playerID){
	this.playerID = playerID;
}

PlayMonumentCommand.prototype = new AbstractCommand;
PlayMonumentCommand.prototype.url = '/moves/Monument';

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
		"playerIndex":this.playerID
	};
};
