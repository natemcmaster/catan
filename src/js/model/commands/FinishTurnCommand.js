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
@class FinishTurnCommand
@constructor 
@param {int} the ID of the player finishing their turn
**/
function FinishTurnCommand(playerID){

	this.playerID = playerID;
	

	FinishTurnCommand.AbstractCommand.url = '/moves/finishTurn';
}

FinishTurnCommand.prototype = new AbstractCommand();
/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getData
@return {JSON} returns the JSON object formatted as the server will want it
**/
FinishTurnCommand.prototype.getData = function(){

	return {'type' : 'finishTurn',
			'playerIndex' : this.playerID};

};