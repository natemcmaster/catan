
/**
@module catan.model
@namespace model
**/

module.exports = Chat;

// anything in this "global" scope is actually namespaced. But make sure to use var.
//var x = 5;

/**
<pre>
Invariant: nothing explodes.
</pre>
@class Chat
@constructor
**/
function Chat(proxy){
	// constructor
	this.proxy = proxy;
}

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method sendMessage
@param {string} message
@param {integer} user
**/
Chat.prototype.sendMessage = function (message, user) {
	// send it
};


var chat = new Chat(myProxy);

// Chat.sendMessage();
chat.sendMessage();
chat.proxy === myProxy;