
/**
This module containts functionaly for the board

@module catan.model.board
@namespace model
**/

module.exports = Bank;

/**
<pre>
Invariant: 
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
@param {int} cardType
@return {boolean} true if user can draw card, false otherwise
**/
Bank.prototype.canWithdraw = function (cardType) {
	// send it
};