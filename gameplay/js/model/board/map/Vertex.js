
/**
 * Hex vertex class
 * 
 * @module catan.model.board.map
 * @namespace model
 */

module.exports = Vertex;

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
	this.owner = data.ownerID;
	this.city = data.worth === 2;
}

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


