var BaseModel = require('./BaseModel');
var util = require('util');

/**
 * This module containts functionality for the map
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

module.exports = Map;
util.inherits(Map, BaseModel);

/**
 * <pre>
 * Invariant: NONE
 * </pre>
 * @class Map
 * @constructor
 */

function Map(data){
	this.data = data;

  this.hexGrid = HexGrid.getRegular(data.hexGrid.radius, Hex, data.hexGrid.hexes);

	this.ports = [];
	for (var i=0; i<data.ports.length; i++) {
		this.ports.push(new Port(proxy, data.ports[i]));
	}
	this.robber = data.robber && new HexLocation(data.robber.x, data.robber.y);
	this.numberTiles = new NumberTiles(data.numbers);
}

/*********** MUTATION FUNCTIONS **************/

Map.prototype.robPlayer = function(playerIndex, victimIndex, location) {

};

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
Map.prototype.placeRoad = function(playerIndex, edgeLocation, isFree) {

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
Map.prototype.placeSettlement = function(playerIndex, vertexLocation, isFree) {

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
Map.prototype.placeCity = function(playerIndex, vertexLocation) {

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
Map.prototype.playRoadBuilding = function(playerIndex, locations) {
  
};

Map.prototype.playSoldier = function(playerIndex, victimIndex, location) {

};