
/**
This module containts functionaly for the map

@module catan.model.board.map
@namespace model
**/

module.exports = Map;

/**
<pre>
Invariant: 
</pre>
@class Map
@constructor
**/
function Map(proxy){
	// constructor
	this.proxy = proxy;
}

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getHexAt
@param {int} x coordinate of desired hex
@param {int} y coordinate of desired hex
@return {Object} Hex object
**/
Map.prototype.getHexAt = function (x, y) {
	// send it
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getRobberPos
@return {Object} HexLocation of robber
**/
Map.prototype.getRobberPos = function () {
	// send it
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method lastRobberPos
@return {Object} HexLocation of last robber location
**/
Map.prototype.lastRobberPos = function () {
	// send it
};


/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getAllHexes
@return {HexLocation[]} HexLocation of last robber location
**/
Map.prototype.getAllHexes = function () {
	// send it
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getOwnedEdges
@return {EdgeLocation[]} Array of EdgeLocations that user owns.
**/
Map.prototype.getOwnedEdges = function () {
	// send it
};


/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getOwnedVertices
@return {VertexLocation[]} Array of VertexLocations that user owns.
**/
Map.prototype.getOwnedVertices = function () {
	// send it
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method portsForPlayer
@return {HexLocation[]} Array of HexLocations of ports that the player owns
**/
Map.prototype.portsForPlayer = function () {
	// send it
};


/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method canPlaceRoad
@return {boolean} True if user can now place road, false if not.
**/
Map.prototype.canPlaceRoad = function () {
	// send it
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method canPlaceRobber
@return {boolean} True if user can now place robber, false if not.
**/
Map.prototype.canPlaceRobber = function () {
	// send it
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method canPlaceSettlement
@return {boolean} True if user can now place a settlement, false if not.
**/
Map.prototype.canPlaceSettlement = function () {
	// send it
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method canPlaceCity
@return {boolean} True if user can now place a city, false if not.
**/
Map.prototype.canPlaceCity = function () {
	// send it
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method placeRoad
@param {HexLocation} Location of hex to place road on
@param {EdgeLocation} Location of edge on hex to place road on
**/
Map.prototype.placeRoad = function (hexLocation, edgeLocation) {
	// send it
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method placeSettlement
@param {HexLocation} Location of hex to place settlement on
@param {VertexLocation} Location of vertex on hex to place settlement on
**/
Map.prototype.placeSettlement = function (hexLocation, vertexLocation) {
	// send it
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method placeCity
@param {HexLocation} Location of hex to place city on
@param {VertexLocation} Location of vertex on hex to place city on
**/
Map.prototype.placeCity = function (hexLocation, vertexLocation) {
	// send it
};
