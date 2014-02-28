
/**
 * This module containts functionaly for the map
 *
 * @module catan.model.board.map
 * @namespace model
 */

var hexgrid = require('./hexgrid')
  , HexGrid = hexgrid.HexGrid
  , HexLocation = hexgrid.HexLocation
  , VertexLocation = hexgrid.VertexLocation
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
 * @param {integer} playerIndex Player index
 * @return {HexLocation[]} Array of HexLocations of ports that the player owns
 */
Map.prototype.portsForPlayer = function (playerIndex) {
	var getVertex = this.getVertex.bind(this);
	return this.ports.filter(function (port) {
		return port.getVertexLocations().some(function (vertex) {
			return getVertex(vertex).getOwner() === playerIndex;
		});
	});
};

/**
 * Get IDs of all the players with property on the given hex
 * @method playersOnHex
 * @param {HexLocation} hex
 * @return {List of int}
 */
Map.prototype.playersOnHex = function (hex) {
  var players = []
    , ow
  for (var i=0; i<6; i++) {
    ow = this.getVertex(new VertexLocation(hex, i)).getOwner()
    if (ow === -1) continue;
    if (players.indexOf(ow) === -1) players.push(ow)
  }
  return players
}

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
		return eloc.getEquivalenceGroup().map(function (eloc) {
			return getEdge(eloc)
		}).filter(function (e) {return !!e})
	}).reduce(function (a, b) {
		return a.concat(b)
	}, []);
	/*
  return location.getConnectedEdges().map(function (eloc) {
    return getEdge(eloc);
  }).filter(function (edge) {
    return !!edge
  });
	*/
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
 * @param {integer} playerIndex Player index
 * @param {EdgeLocation} location The location to place the road
 * @param {boolean} setup whether this is happening during the setup phase
 * @return {boolean} True if user can now place road, false if not.
 */
Map.prototype.canPlaceRoad = function (playerIndex, location, setup, extraLoc) {
  if (!location) return false;
	var edge = this.getEdge(location)
    , getHex = this.hexGrid.getHex.bind(this.hexGrid)
    , canPlaceSettlement = this.canPlaceSettlement.bind(this);
	if (!edge || edge.isOccupied()) return false;
  var bordersLand = location.getEquivalenceGroup().some(function (eloc) {
    var hex = getHex(eloc.getHexLocation())
    return hex && hex.isLand()
  })
  if (!bordersLand) return false
  if (setup) {
    // you must be able to place a settlmeent on at least one end
    return location.getNeighborVertexes().some(function (vx) {
      return canPlaceSettlement(playerIndex, vx, true)
    })
  }
	var ownAdjacent = this.getAdjascentEdges(location).some(function (edge) {
		return (extraLoc && edge.getLocation().getIDString() === extraLoc.getIDString()) || (edge.isOccupied() && edge.getOwner() === playerIndex);
	});
  return ownAdjacent;
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method canPlaceRobber
 * @param {integer} playerIndex Player index
 * @param {HexLocation} location The location to place the robber
 * @return {boolean} True if user can now place robber, false if not.
 */
Map.prototype.canPlaceRobber = function (playerIndex, location) {
	var hex = this.hexGrid.getHex(location);
	return !(!hex || (this.robber && location.equals(this.robber)) || !hex.isLand() || hex.isDesert());
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method canPlaceSettlement
 * @param {integer} playerIndex Player index
 * @param {VertexLocation} vertex The location to place the settlement
 * @param {boolean} detached Is this allowed to be detached from a road?
 * @return {boolean} True if user can now place a settlement, false if not.
 */
Map.prototype.canPlaceSettlement = function (playerIndex, location, detached) {
  var vertex = this.getVertex(location)
  if (!vertex || vertex.isOccupied()) return false
	var tooClose = this.getAdjascentVertices(location).some(function (vertex) {
		return vertex.isOccupied();
	});

	if (tooClose) {
    // console.log('settlement too close');
    return false;
  }
	var hasAccess = detached || this.getAdjascentEdges(location).some(function (edge) {
		return edge && edge.getOwner() === playerIndex
	});
  if (!hasAccess) {
    // console.log('no roads');
  }
	return hasAccess;
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method canPlaceCity
 * @param {integer} playerIndex Player index
 * @param {VertexLocation} location The location to place the city
 * @return {boolean} True if user can now place a city there (i.e. they have a
 * settlement there), false if not.
 */
Map.prototype.canPlaceCity = function (playerIndex, location) {
  var vertex = this.getVertex(location);
  return vertex && vertex.getOwner() === playerIndex && !vertex.hasCity();
};

/**
 */
Map.prototype.getEdge = function (location) {
  var hex = this.hexGrid.getHex(location.getHexLocation());
  return hex && hex.getEdge(location.direction)
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
 * @param {integer} playerIndex Player index
 * @param {EdgeLocation} Location of edge on hex to place road on
 * @param {boolean} isFree is it free?
 * @return {void}
 */
Map.prototype.placeRoad = function (playerIndex, edgeLocation, isFree) {
  this.proxy.executeCommand(new BuildRoadCommand(playerIndex, edgeLocation, isFree));
};

/**
 * <pre>
 * Pre-condition: the location is a legal move for the player, and it is their turn, and they have the resources & buildings.
 * Post-condition: a settlement will be placed there (async!)
 * </pre>
 * @method placeSettlement
 * @param {integer} playerIndex Player index
 * @param {VertexLocation} Location of vertex on hex to place settlement on
 * @param {boolean} isFree is it free?
 * @return {void}
 */
Map.prototype.placeSettlement = function (playerIndex, vertexLocation, isFree) {
  this.proxy.executeCommand(new BuildSettlementCommand(playerIndex, vertexLocation, isFree));
};

/**
 * <pre>
 * Pre-condition: the location is a legal move for the player, and it is their turn, and they have the resources & buildings.
 * Post-condition: a city will replace the settlement at that location (async!)
 * </pre>
 * @method placeCity
 * @param {integer} playerIndex Player index
 * @param {VertexLocation} Location of vertex on hex to place city on
 * @return {void}
 */
Map.prototype.placeCity = function (playerIndex, vertexLocation) {
  this.proxy.executeCommand(new BuildCityCommand(playerIndex, vertexLocation));
};

/**
 * <pre>
 * Pre-condition: the player has a road-building card, and enough roads left,
 * and it is their turn.
 * Post-condition: roads will be placed at the given locations (async!)
 * </pre>
 * @method placeRoads
 * @param {integer} playerIndex
 * @param {List<EdgeLocation>} locations
 * @return {void}
 */
Map.prototype.placeRoads = function (playerIndex, locations) {
  this.proxy.executeCommand(new PlayRoadBuilding(playerIndex, locations));
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

