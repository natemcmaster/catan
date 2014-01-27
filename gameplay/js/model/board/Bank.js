
/**
This module containts functionaly for the board

@module catan.model.board
@namespace model
**/

module.exports = Bank;

/**
<pre>
Invariant: The bank has 0 or more of each resource. There are never more than 19 of a given resource in the game alrogether.
</pre>
@class Bank
@constructor
**/
function Bank(proxy){
	// constructor
	this.proxy = proxy;
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

