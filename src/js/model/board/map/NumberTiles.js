
/**
 * Number Tiles
 * 
 * @module catan.model.board.map
 * @namespace model
 */

module.exports = NumberTiles;

/**
 * <pre>
 * Invariant: NONE
 * </pre>
 * @class NumberTiles
 * @param {JSON} data
 * @constructor
 */
function NumberTiles(data) {
	this.numbers = data;
}

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method getNumberPositions
 * @return {Map<integer, List<HexLocation>>} A map of the locations
 */
NumberTiles.prototype.getNumberPositions = function () {
	return this.numbers;
};



