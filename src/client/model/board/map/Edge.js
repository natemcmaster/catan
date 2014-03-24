
/**
 * Hex edge class
 * 
 * @module catan.model.board.map
 * @namespace model
 */

var hexgrid = require('./hexgrid');

module.exports = Edge;

/**
 * <pre>
 * Invariant: 
 * </pre>
 * @class Edge
 * @param {int} direction
 * @param {JSON} data json data
 * @constructor
 */
function Edge(direction, data){
	this.direction = direction;
	this.owner = data && data.value.ownerID;
  if (false === this.owner) {
    this.owner = -1;
  }
}

Edge.prototype = new hexgrid.BaseContainer();

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method getHexDirection
 * @return {integer} The direction
 */
Edge.prototype.getHexDirection = function () {
	return this.direction;
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method isOccupied
 * @return {boolean} whether the edge is occupied
 */
Edge.prototype.isOccupied = function () {
	return this.owner !== -1;
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method getOwner
 * @return {int} playerID of the owner
 */
Edge.prototype.getOwner = function () {
	return this.owner;
};


