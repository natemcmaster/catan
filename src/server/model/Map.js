var BaseModel = require('./BaseModel');
var Hexgrid = require('./hexgrid');
var util = require('util');

/**
 * This module containts functionality for the map
 *
 * @module catan.model.board.map
 * @namespace model
 */

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
  BaseModel.call(this, data);
  this.hex = new Hexgrid(data);
}

Map.prototype.getCardsRolled = function (number) {
  var that = this
    , robber = this.data.robber
    , cards = {};
  this.data.numbers[number].forEach(function (location) {
    if (location.x === robber.x && location.y === robber.y) {
      return // robbed
    }
    var hex = that.hex.getHex(location.x, location.y)
    if (!hex.isLand) return;
    var land = hex.landtype.toLowerCase();
    hex.vertexes.forEach(function (vx) {
      var owner = vx.value.ownerID
      if (owner === -1) return;
      if (!cards[owner]) {
        cards[owner] = {}
      }
      if (!cards[owner][land]) {
        cards[owner][land] = 0;
      }
      cards[owner][land] += vx.value.worth;
    });
  });
  return cards;
}

Map.prototype.getResourcesForVertexLocation = function (loc) {
  var cards = {}
  this.hex.hexesForVertex(loc.x, loc.y, loc.direction).forEach(function (hex) {
    if (!hex) return;
    if (!hex.isLand) return;
    cards[hex.landtype.toLowerCase()] = 1
  })
  return cards;
}

Map.prototype.getRoadOwner = function (x, y, dir) {
  return this.hex.getEdge(x, y, dir).value.ownerID;
}

Map.prototype.getSettlementOwner = function (x, y, dir) {
  return this.hex.getVertex(x, y, dir).value.ownerID;
}

/**
 * <pre>
 * Pre-condition: The robber is not currently at the location desired
 * Post-condition: The robber is moved to the new location
 * </pre>
 * @method moveRobber
 * @param {integer} x
 * @param {integer} y
 * @return {void}
 */
Map.prototype.moveRobber = function (x, y) {
  if (this.data.robber.x === x && this.data.robber.y === y) {
    throw new Error('Must move the robber from its current position');
  }
  this.data.robber = {
    x: x,
    y: y
  }
}

/**
 * <pre>
 * Pre-condition: the location is a legal move for the player, and it is their turn, and they have the resources & buildings.
 * Post-condition: a road will be placed there
 * </pre>
 * @method placeRoad
 * @param {integer} playerIndex Player index
 * @param {object} location {x: int, y: int, direction: str}
 * @return {void}
 */
Map.prototype.placeRoad = function (playerIndex, loc) {
  if (this.hex.edgeIsOccupied(loc.x, loc.y, loc.direction)) {
    throw new Error('Cannot place road -- edge is already occupied');
  }
  this.hex.setEdge(loc.x, loc.y, loc.direction, playerIndex);
}

/**
 * <pre>
 * Pre-condition: the location is a legal move for the player, and it is their turn, and they have the resources & buildings.
 * Post-condition: a settlement will be placed there
 * </pre>
 * @method placeSettlement
 * @param {integer} playerIndex Player index
 * @param {object} Location {x: int, y: int, direction: str}
 * @return {void}
 */
Map.prototype.placeSettlement = function(playerIndex, loc) {
  if (this.hex.vertexIsOccupied(loc.x, loc.y, loc.direction)) {
    throw new Error('Cannot place settlement -- vertex is already occupied');
  }
  this.hex.setVertex(loc.x, loc.y, loc.direction, playerIndex, 1);
};

/**
 * <pre>
 * Pre-condition: the location is a legal move for the player, and it is their turn, and they have the resources & buildings.
 * Post-condition: a city will replace the settlement at that location
 * </pre>
 * @method placeCity
 * @param {integer} playerIndex Player index
 * @param {VertexLocation} Location of vertex on hex to place city on
 * @return {void}
 */
Map.prototype.placeCity = function(playerIndex, loc) {
  if (!this.hex.vertexHasMySettlement(loc.x, loc.y, loc.direction, playerIndex)) {
    throw new Error('A city can only be placed to replace your own settlement');
  }
  this.hex.setVertex(loc.x, loc.y, loc.direction, playerIndex, 2);
};

Map.prototype.getNumberLocation = function(number){

    return this.data.numbers[String(number)];
};
