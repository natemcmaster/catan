
/**
@module catan.model.board
@namespace model
**/

module.exports = Bank;

// anything in this "global" scope is actually namespaced. But make sure to use var.
//var x = 5;

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
**/
Bank.prototype.canWithdraw = function (message, user) {
	// send it
};