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
@class PlayYearyOfPlentyCommand
@constructor 
@param {int} playerID the ID of the player playing the Year of Plenty Card
@param {int} resource1 enumeration of the type of resource for resource 1
@param {int} resource2 enumeration of the type of resource for resource 2
**/
function PlayYearOfPlentyCommand(playerId, resource1, resource2){

	this.playerID = playerId;
	this.resource1 = resource1;
	this.resource2 = resource2;

	PlayYearOfPlentyCommand.AbstractCommand.url = '/moves/Year_of_Plenty';
}

PlayYearOfPlentyCommand.prototype = new AbstractCommand();
/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getData
@return {JSON} returns the JSON object formatted as the server will want it
**/
PlayYearOfPlentyCommand.prototype.getData = function(){

	return {'type' : 'Year_of_Plenty',
			'playerIndex' : this.playerID,
			'resource1' : this.resource1,
			'resource2' : this.resource2};
};
