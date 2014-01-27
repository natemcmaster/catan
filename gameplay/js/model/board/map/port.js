
/**
This module containts functionaly for the map

@module catan.model.board.map
@namespace model
**/

module.exports = Port;

/**
<pre>
Invariant: NONE
</pre>
@class Port
@constructor
**/
function Port(proxy){
	// constructor
	this.proxy = proxy;
}

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getRatio
@return {int} Number of a given resource that must be traded to exchange for a desired resource.
**/
Port.prototype.getRatio = function () {
	// send it
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getResource
@return {int} Type of resource that this port represents
**/
Port.prototype.getResource = function () {
	// send it
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getPosition
@return {Object} x,y coordinate pair representing position of port
**/
Port.prototype.getPosition = function () {
	// send it
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getVertices
@return {Object} Array of objects representing vertices of given port
**/
Port.prototype.getVertices = function () {
	// send it
};


