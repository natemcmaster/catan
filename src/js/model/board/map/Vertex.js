
/**
 * Hex vertex class
 * 
 * @module catan.model.board.map
 * @namespace model
 */

module.exports = Vertex;
var hexgrid = require('./hexgrid');

/**
 * <pre>
 * Invariant: NONE
 * </pre>
 * @class Vertex
 * @param {int} direction the vertex direction
 * @param {JSON} data the json data
 * @constructor
 */
function Vertex(direction, data){
	this.direction = direction;
	this.owner = data && data.value.ownerID;
	this.city = data && data.value.worth === 2;
}

Vertex.prototype = new hexgrid.BaseContainer();

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method getHexDirection
 * @return {integer} Hex direction
 */
Vertex.prototype.getHexDirection = function () {
	return this.direction;
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method isOccupied
 * @return {boolean} whether the vertex is occupied
 */
Vertex.prototype.isOccupied = function () {
	return this.owner !== -1;
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method hasCity
 * @return {boolean} whether the vertex has a city
 */
Vertex.prototype.hasCity = function () {
	return this.city;
};


