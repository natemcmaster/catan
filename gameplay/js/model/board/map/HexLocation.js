/**
This module containts functionaly for the map

@module catan.model.board.map
@namespace model
**/

module.exports = HexLocation;

/**
<pre>
Invariant: 
</pre>
@class HexLocation
@constructor
**/
function HexLocation(proxy){
	// constructor
	this.proxy = proxy;
}

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getX
@return {int} x coordinate of this hex
**/
HexLocation.prototype.getX = function () {
	// send it
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getY
@return {int} y coordinate of this hex
**/
HexLocation.prototype.getY = function () {
	// send it
};
