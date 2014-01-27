

/**
 * A single Hex. Extends BasicHex.
 *
 * @module catan.model.board.map
 * @namespace model
 */

var Edge = require('./Edge');
var Vertex = require('./Vertex');
module.exports = Hex;

/**
 * <pre>
 * Invariant: NONE
 * </pre>
 * @class Hex
 * @param {hexgrid.HexLocation} the location of the hex
 * @param {JSON} data The data from the JSON model
 * @constructor
 */
function Hex(location, data) {
  catan.models.hexgrid.BasicHex.call(this, location, Edge, Vertex);
}

Hex.prototype = new catan.models.hexgrid.BasicHex;

/**
 * When a settlement is to be placed, all three adjoining hexes will be
 * queried.
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method canPlaceSettlement
 * @param {integer} playerId
 * @param {VertexDirection} vertex
 * @return {integer} -1 if definitely no, 0 if maybe, 1 if yes
 */
Hex.prototype.canPlaceSettlement = function (playerId, vertex) {
};

/**
 * Get the locations where a player can build a road
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method validRoadPlacements
 * @param {integer} playerId
 * @return {List<EdgeLocation>} locations where a road can be built
 */
Hex.prototype.validRoadPlacements = function (playerId) {
};


/**
 * A list of the edges that have a road on them (for display)
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method getOwnedEdges
 * @param {integer} playerId
 * @return {List<Edge>} a list of edges
 */
Hex.prototype.getOwnedEdges = function () {
};


/**
 * A list of the vertecies that have a settlement or city on them (for display)
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method getOwnedVertices
 * @param {integer} playerId
 * @return {List<Vertex>} a list of vertecies
 */
Hex.prototype.getOwnedVertices = function () {
};

