var GameBoard = require("./board/GameBoard");
var Chat = require("./Chat");
var Log = require("./Log");
var Proxy = require("./Proxy");

/**
  This module contains the top-level client model class
  
  @module   catan.models
  @namespace models
*/

if (typeof(catan) === 'undefined') catan = {}
catan.models = catan.models || {};

catan.models.ClientModel  = ClientModel
/** 
* This the top-level client model class that contains the local player, map contents, etc.

* @class ClientModel
* @constructor
* @param {integer} playerID The id of the local player, extracted from the cookie
*/
function ClientModel(playerID){
  this.playerID = playerID;
}      

/**
  * This is called to fetch the game state from the server the very first time.
  * It should: 1) fetch the game state JSON from the server, 2) update the client model with the
  * returned data, 3) notify all client model listeners that the model has changed, and 4) invoke
  * the success callback function with the object received from the server.
  * 
  * @method initFromServer
  * @param {function} success - A callback function that is called after the game state has been fetched from the server and the client model updated. This function is passed a single parameter which is the game state object received from the server.
  */
ClientModel.prototype.initFromServer = function(success){
  this.proxy = new Proxy(this.populateModels.bind(this));
  this.proxy.getModel(function(err, data){
    success();
    this.populateModels(data);
  }.bind(this));

  this.proxy.startPolling();
  // TODO: 1) fetch the game state from the server, 2) update the client model, 3) call the "success" function.
}

// 
ClientModel.prototype.populateModels = function (data) {

  this.log = new Log(this.proxy, data.log);
  this.chat = new Chat(this.proxy, data.chat);
  this.gameboard = new GameBoard(this.proxy, data);
}

// New things to be implemented

/**
 * The current player robs another player
 * <pre>
 * Pre-condition: robbedPlayerID is not the current player, and the current
 * player is allowed to rob someone.
 * Post-condition (async!): the robbery happens
 *
 * @param {int} robbedPlayerID The player to be robbed
 */
ClientModel.prototype.robPlayer = function (robbedPlayerID) {
  this.rob(robbedPlayerID)
  // TODO: implement, call proxy, etc
}

ClientModel.prototype.getRobPlayerInfo = function () {
  var currentPlayer = this.gameboard.turnTracker.currentPlayerId()
  return this.gameboard.players.map(function (player) {
    return player.robInfo()
  }).filter(function (player) {
    return player.playerNum !== currentPlayer
  })
}

/**
Helper Function that returns the current player object

*/
ClientModel.prototype.getCurrentPlayer = function() {

  return this.gameboard.getPlayerByID(this.gameboard.turnTracker.currentPlayerId())
}

ClientModel.prototype.getClientPlayer = function() {
  
  return this.gameboard.getPlayerByID(this.playerID)
}

module.exports = ClientModel;
