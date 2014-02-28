/**
@module catan.model.board
@namespace board
**/

module.exports = Bank;

/**
The game's bank, containing the resource cards.
<pre>
Invariant: The bank has 0 or more of each resource. There are never more than 19 of a given resource in the game.
</pre>
@class Bank
@constructor
**/
function Bank(proxy, bank){
	this.proxy = proxy;

	this.brick = bank.brick;
	this.ore = bank.ore;
	this.sheep = bank.sheep;
	this.wheat = bank.wheat;
	this.wood = bank.wood;
}

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method canWithdraw
@param {String} resourceType
@return {boolean} true if user can draw the resource, false otherwise
**/
Bank.prototype.canWithdraw = function (resourceType) {
	return this[resourceType] > 0;
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getAvailableResources
@return {array} an array that contains the names of all the resources that can be withdrawn
**/
Bank.prototype.getAvailableResources = function() {
	var availableResources = [];

	for (var resource in this) {
		if (this.hasOwnProperty(resource)) {
			if (this.canWithdraw(resource)) {
				availableResources.push(resource);
			}
		} 
	}

	return availableResources;
};
