
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
 * @constructor
 */
function Hex(location, data) {
  console.log(data)
  catan.models.hexgrid.BasicHex.call(this, location, Edge, Vertex, data.edges, data.vertexes);
  this.landType = data.landType || -1;
  this.isLand = data.isLand;
}

Hex.prototype = new catan.models.hexgrid.BasicHex;

// TODO: I think we'll need a populateFromJson method here, unless they fix
// the constructor weirdness.

/**
 * Land type, described as a string
 * @property landType
 * @type {string} what type of land is this
 */
Hex.prototype.landType = 'uninitialized';

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method isLand
 * @return {Boolean} True when this hex is land
 */
Hex.prototype.isLand=function(){
  return this._isLand;
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method isDesert
 * @return {Boolean} True when this hex is desert
 */
Hex.prototype.isDesert = function(){
	return this.landType == 'desert';
};



