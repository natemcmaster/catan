
/**
@module catan.model.board
@namespace board
**/

module.exports = Bank;

/**
The game's bank, containing the resource cards.
<pre>
Invariant: The bank has 0 or more of each resource. There are never more than 19 of a given resource in the game alrogether.
</pre>
@class Bank
@constructor
**/
function Bank(proxy, bank){
	this.proxy = proxy;
	this.numBrick = bank.brick;
	this.numOre = bank.ore;
	this.numSheep = bank.sheep;
	this.numWheat = bank.wheat;
	this.numWood = bank.wood;
}

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method canWithdraw
@param {int} resourceType
@return {boolean} true if user can draw the resource, false otherwise
**/
Bank.prototype.canWithdraw = function (resourceType) {
};

