module.exports=RollDiceCommand;

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
@param {int} playerIndex the index (NOT ID) of the player rolling the dice
@param {int} number number rolled
**/
function RollDiceCommand(playerIndex, number){

	this.playerIndex = playerIndex;
	this.number = number;
}

RollDiceCommand.prototype = new AbstractCommand();
RollDiceCommand.prototype._name = 'RollDice';

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getData
@return {JSON} returns the JSON object formatted as the server will want it
**/
RollDiceCommand.prototype.getData = function() {

	return {'type' : 'rollNumber',
						'playerIndex' : this.playerIndex,
						'number' : this.number};
};
