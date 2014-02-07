
/**
 * This module containts functionaly for the map
 *
 * @module catan.model.board.map
 * @namespace model
 */

var hexgrid = require('./hexgrid')
  , HexGrid = hexgrid.HexGrid
  , HexLocation = hexgrid.HexLocation
  , VertexDirection = hexgrid.VertexDirection
  , Hex = require('./Hex')
  , NumberTiles = require('./NumberTiles')
  , Port = require('./Port')
  , BuildRoadCommand = require('../../commands/BuildRoadCommand')
  , BuildSettlementCommand = require('../../commands/BuildSettlementCommand')
  , BuildCityCommand = require('../../commands/BuildCityCommand')
  , PlayRoadBuilding = require('../../commands/PlayRoadBuildingCommand');

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

	this.hexGrid = HexGrid.getRegular(data.hexGrid.radius, Hex, data.hexGrid.hexes);

	this.ports = [];
	for (var i=0; i<data.ports.length; i++) {
		this.ports.push(new Port(proxy, data.ports[i]));
	}
	this.robber = data.robber && new HexLocation(data.robber.x, data.robber.y);
	this.numberTiles = new NumberTiles(data.numbers);
}

// TODO: we will need a populateFromJson method unless they fix the
// constructor weirdness

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
	return this.hexGrid.getVertexes().filter(function (vertex) {
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
	var getVertex = this.getVertex.bind(this);
	return this.ports.filter(function (port) {
		return port.getVertexLocations().some(function (vertex) {
			return getVertex(vertex).getOwner() === playerId;
		});
	});
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method getAdjascentEdges
 * @param {BaseLocation} location
 * @return {Edge[]} Array of connected edges
 */
Map.prototype.getAdjascentEdges = function (location) {
  var getEdge = this.getEdge.bind(this);
  return location.getConnectedEdges().map(function (eloc) {
    return getEdge(eloc);
  }).filter(function (edge) {
    return !!edge
  });
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method getAdjascentVertices
 * @param {VertexLocation} location
 * @return {Edge[]} Array of adjoining vertices
 */
Map.prototype.getAdjascentVertices = function (location) {
  var getVertex = this.getVertex.bind(this)
    , id = location.getIDString()
    , vxs = [];
  location.getConnectedEdges().forEach(function (eloc) {
    vxs = vxs.concat(eloc.getNeighborVertexes().filter(function (vloc) {
      return vloc.getIDString() !== id
    }).map(function (vloc) {
      return getVertex(vloc);
    }).filter(function (vx) {
      return !!vx
    }))
  });
  return vxs
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
  if (!location) return false;
	var edge = this.getEdge(location);
	if (edge.isOccupied()) return false;
	var ownAdjacent = this.getAdjascentEdges(location).some(function (edge) {
		return edge.isOccupied() && edge.getOwner() === playerId;
	});
  return ownAdjacent;
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
	return !((!this.robber || location.equals(this.robber)) || !hex.isLand() || hex.isDesert());
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
Map.prototype.canPlaceSettlement = function (playerId, location) {
	var tooClose = this.getAdjascentVertices(location).some(function (vertex) {
		return vertex.isOccupied();
	});
	if (tooClose) return false;
	var hasAccess = this.getAdjascentEdges(location).some(function (edge) {
		return edge.getOwner() === playerId
	});
	return hasAccess;
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method canPlaceCity
 * @param {integer} playerId Player ID
 * @param {VertexLocation} location The location to place the city
 * @return {boolean} True if user can now place a city there (i.e. they have a
 * settlement there), false if not.
 */
Map.prototype.canPlaceCity = function (playerId, location) {
  var vertex = this.getVertex(location);
  return vertex.getOwner() === playerId && !vertex.hasCity();
};

/**
 */
Map.prototype.getEdge = function (location) {
  var hex = this.hexGrid.getHex(location.getHexLocation());
  if (!hex) return false
  return hex.getEdge(location.direction)
};

/**
 * Returns false if no vertex was found
 */
Map.prototype.getVertex = function (location) {
  var getHex = this.hexGrid.getHex.bind(this.hexGrid)
    , vx = false
  location.getEquivalenceGroup().some(function (vloc) {
    var hex = getHex(vloc.getHexLocation())
      , dir = vloc.direction;
    if (!hex) return
    if ('string' === typeof dir) {
      dir = VertexDirection[dir];
    }
    vx = hex.getVertex(dir)
    return true
  })
  return vx
};




/*********** MUTATION FUNCTIONS **************/


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
  this.proxy.executeCommand(new BuildRoadCommand(playerId, edgeLocation));
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
  this.proxy.executeCommand(new BuildSettlementCommand(playerId, vertexLocation));
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
  this.proxy.executeCommand(new BuildCityCommand(playerId, vertexLocation));
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
  this.proxy.executeCommand(new PlayRoadBuilding(playerId, locations));
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
  return this.numberTiles;
};

