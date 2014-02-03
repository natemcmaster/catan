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
@class RollDiceCommand
@constructor 
@param {int} playerID the ID of the player rolling the dice
@param {int} number number rolled
**/
function RollDiceCommand(playerID, number){

	this.playerID = playerID;
	this.number = number;

	RollDiceCommand.AbstractCommand.url = '/moves/rollNumber';
}

RollDiceCommand.prototype = new AbstractCommand();
/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getData
@return {JSON} returns the JSON object formatted as the server will want it
**/
RollDiceCommand.prototype.getData = function(){

	return {'type' : 'rollNumber',
						'playerIndex' : this.playerID,
						'number' : this.number};
};
