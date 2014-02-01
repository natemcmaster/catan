
/**
 * This module containts functionaly for the map
 * 
 * @module catan.model.board.map
 * @namespace model
 */

module.exports = Port;

function vertexLocationFromJson(data) {
	return new VertexLocation(new HexLocation(data.x, data.y), data.direction);
}

function hexLocationFromJson(data) {
	return new HexLocation(data.x, data.y);
}

/**
 * <pre>
 * Invariant: NONE
 * </pre>
 * @class Port
 * @constructor
 */
function Port(proxy, data){
	// constructor
	this.proxy = proxy;
	this.ratio = data.ratio;
	this.vertex1 = vertexLocationFromJson(data.validVertex1);
	this.vertex2 = vertexLocationFromJson(data.validVertex2);
	this.location = hexLocationFromJson(data.location);
	this.orientation = data.orientation;
}

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method getRatio
 * @return {int} Number of a given resource that must be traded to exchange for a desired resource.
 */
Port.prototype.getRatio = function () {
	return this.ratio;
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method getResource
 * @return {ResourceType} Type of resource that this port represents
 */
Port.prototype.getResource = function () {
	return this.inputResource;
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method getPosition
 * @return {Object} x,y coordinate pair representing position of port
 */
Port.prototype.getPosition = function () {
	return this.location;
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method getVertexLocations()
 * @return {List<VertexLocation>} Array of vertex locations for the port
 */
Port.prototype.getVertexLocations = function () {
	return [this.vertex1, this.vertex2];
};


