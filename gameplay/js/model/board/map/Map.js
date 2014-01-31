
/**
 * This module containts functionaly for the map
 *
 * @module catan.model.board.map
 * @namespace model
 */

module.exports = Map;

/**
 * <pre>
 * Invariant: NONE
 * </pre>
 * @class Map
 * @constructor
 */

function Map(proxy, data){
	this.proxy = proxy;

	this.hexGrid = new HexGrid(data.hexGrid);
	this.ports = [];
	for (var i=0; i<data.ports.length; i++) {
		this.ports.push(new Port(data.ports[i]));
	}
	this.lastRobber = new HexLocation(data.lastRobber);
	this.robber = new HexLocation(data.robber);
	this.numberTiles = new NumberTiles(data.numbers);
}

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method getHexAt
 * @param {integer} x coordinate of desired hex
 * @param {integer} y coordinate of desired hex
 * @return {Object} Hex object
 */
Map.prototype.getHexAt = function (x, y) {
	return this.hexGrid.getHex(new HexLocation(x, y));
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method getRobberPos
 * @return {HexLocation} HexLocation of robber
 */
Map.prototype.getRobberPos = function () {
	return this.robber;
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method lastRobberPos
 * @return {HexLocation} HexLocation of last robber location
 */
Map.prototype.lastRobberPos = function () {
	return this.lastRobber;
};


/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method getAllHexes
 * @return {HexLocation[]} All of the hexes
 */
Map.prototype.getAllHexes = function () {
	return this.hexGrid.getHexes();
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method getOwnedEdges
 * @return {EdgeLocation[]} Array of EdgeLocations that are owned by users.
 */
Map.prototype.getOwnedEdges = function () {
	return this.hexGrid.getEdges().filter(function (edge) {
		return edge.isOccupied();
	});
};


/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method getOwnedVertices
 * @return {VertexLocation[]} Array of VertexLocations that user owns.
 */
Map.prototype.getOwnedVertices = function () {
	return this.hexGrid.getEdges().filter(function (vertex) {
		return vertex.isOccupied();
	});
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method portsForPlayer
 * @param {integer} playerId Player ID
 * @return {HexLocation[]} Array of HexLocations of ports that the player owns
 */
Map.prototype.portsForPlayer = function (playerId) {
	var vertecies = [];
	var getVertex = this.hexGrid.getVertex.bind(this.hexGrid);
	return this.ports.filter(function (port) {
		return port.getVertices().some(function (vertex) {
			getVertex(vertex)
		});
	});
};


/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method canPlaceRoad
 * @param {integer} playerId Player ID
 * @param {EdgeLocation} location The location to place the road
 * @return {boolean} True if user can now place road, false if not.
 */
Map.prototype.canPlaceRoad = function (playerId, location) {
	var edge = this.hexGrid.getEdge(location);
	if (edge.isOccupied()) return false;
	return this.hexGrid.getAdjascentEdgesForEdge(location).some(function (edge) {
		return edge.isOccupied() && edge.getOwner() === playerId;
	});
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method canPlaceRobber
 * @param {integer} playerId Player ID
 * @param {HexLocation} location The location to place the robber
 * @return {boolean} True if user can now place robber, false if not.
 */
Map.prototype.canPlaceRobber = function (playerId, location) {
	var hex = this.hexGrid.getHex(location);
	return !(location.equals(this.robber) || location.equals(this.lastRobber) || !hex.isLand() || hex.isDesert())
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method canPlaceSettlement
 * @param {integer} playerId Player ID
 * @param {VertexLocation} vertex The location to place the settlement
 * @return {boolean} True if user can now place a settlement, false if not.
 */
Map.prototype.canPlaceSettlement = function (playerId, vertex) {
	var caPlace = false;
	this.hexGrid.getAdjascentEdgesForVertex(vertex).
	// send it
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method canPlaceCity
 * @param {integer} playerId Player ID
 * @param {VertexLocation} vertex The location to place the city
 * @return {boolean} True if user can now place a city, false if not.
 */
Map.prototype.canPlaceCity = function (playerId, vertex) {
	// send it
};

/**
 * <pre>
 * Pre-condition: the location is a legal move for the player, and it is their turn, and they have the resources & buildings.
 * Post-condition: a road will be placed there (async!)
 * </pre>
 * @method placeRoad
 * @param {integer} playerId Player ID
 * @param {EdgeLocation} Location of edge on hex to place road on
 * @return {void}
 */
Map.prototype.placeRoad = function (playerId, edgeLocation) {
	// send it
};

/**
 * <pre>
 * Pre-condition: the location is a legal move for the player, and it is their turn, and they have the resources & buildings.
 * Post-condition: a settlement will be placed there (async!)
 * </pre>
 * @method placeSettlement
 * @param {integer} playerId Player ID
 * @param {VertexLocation} Location of vertex on hex to place settlement on
 * @return {void}
 */
Map.prototype.placeSettlement = function (playerId, vertexLocation) {
	// send it
};

/**
 * <pre>
 * Pre-condition: the location is a legal move for the player, and it is their turn, and they have the resources & buildings.
 * Post-condition: a city will replace the settlement at that location (async!)
 * </pre>
 * @method placeCity
 * @param {integer} playerId Player ID
 * @param {VertexLocation} Location of vertex on hex to place city on
 * @return {void}
 */
Map.prototype.placeCity = function (playerId, vertexLocation) {
	// send it
};

/**
 * <pre>
 * Pre-condition: the player has a road-building card, and enough roads left,
 * and it is their turn.
 * Post-condition: roads will be placed at the given locations (async!)
 * </pre>
 * @method placeRoads
 * @param {integer} playerId
 * @param {List<EdgeLocation>} locations
 * @return {void}
 */
Map.prototype.placeRoads = function (playerId, locations) {
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method getNumbers
 * @return {NumberTiles} the number tiles
 */
Map.prototype.getNumbers = function () {
};

