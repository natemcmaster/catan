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
  this.observers=[];
  this.revision = -1;
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
    this.populateModels(data);
    success();
  }.bind(this));

  this.proxy.startPolling();
}

// 
ClientModel.prototype.populateModels = function (data) {
  if(this.revision === data.revision){
      return;
  }
  this.revision = data.revision;
  this.log = new Log(this.proxy, data.log);
  this.chat = new Chat(this.proxy, data.chat);
  this.gameboard = new GameBoard(this.proxy, data);
  this.notifyObservers();
}

// New things to be implemented

/**
 * <pre>
 * Pre-condition: The function is bound to the approprate context
 * Post-condition: this function will be called everytime the model changes
 * </pre>
 * Adds a new observer to the client model. It receives update every time the model changes.
 * @method addObserver
 * @param {function} observer The function to call on updates.
 * @return {void}
 */
ClientModel.prototype.addObserver = function(observer){
  if(typeof observer === 'function')
    this.observers.push(observer);
}

/**
 * Notifies all observers of a change to the client model.
 * @method notifyObservers
 * @return {void} 
 */
ClientModel.prototype.notifyObservers = function(){

  this.observers.forEach(function(observer){
    observer();
  })
}

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
 * Get a map of playerId to color
 * @method getPlayerColors
 * @return {object}
 */
ClientModel.prototype.getPlayerColors = function () {
  return this.gameboard.players.map(function (player) { return player.color })
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

ClientModel.prototype.getCurrentStatus = function() {
  return this.gameboard.turnTracker.getStatus();
}
ClientModel.prototype.getPlayerByName = function(name) {
  var players = this.gameboard.players;
  for(var i = 0; i < players.length; i++){
    if(players[i].name == name){
      return players[i];
    }
  }
  console.err('BAD PLAYER NAME');
}
/**
 * Identifies if is the client player's turn
 * @return {Boolean} true when
 */
ClientModel.prototype.isMyTurn = function(){
  return this.playerID == this.gameboard.turnTracker.currentPlayerId();
}

/**
 * Issues command to end the current player's turn
 * @return {void} 
 */
ClientModel.prototype.endMyTurn = function(){
  if(this.isMyTurn())
    this.gameboard.turnTracker.finishTurn();
}

ClientModel.prototype.discardCards = function(playerID, brick, ore, sheep, wheat, wood){
  var player = this.gameboard.getPlayerByID(playerID);
  player.discardCards(brick, ore, sheep, wheat, wood);
}

ClientModel.prototype.getCurrentStatus = function(){
  return this.gameboard.turnTracker.status;
}

module.exports = ClientModel;
