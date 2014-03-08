var GameBoard = require("./board/GameBoard");
var Chat = require("./Chat");
var Log = require("./Log");
var Proxy = require("./Proxy");

var Definitions = require('byu-catan').definitions;
var ResourceTypes = Definitions.ResourceTypes;

module.exports = ClientModel;

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
    try{
      this.populateModels(data); 
    }
    catch(e){
      console.error(e);
      return;
    }
    
    success();

  }.bind(this));

  this.proxy.startPolling();
}

/**
 * Updates the models if the revision number has changed.
 * @param  {object} data Raw data from server
 * @return {void}      
 */
ClientModel.prototype.populateModels = function (data) {
  if(!data || !data.log || !data.chat || 'undefined' === typeof data.revision)
    throw new TypeError('invalid data model');

  if(this.revision === data.revision){
      return;
  }
  this.revision = data.revision;
  this.log = new Log(this.proxy, data.log);
  this.chat = new Chat(this.proxy, data.chat);
  try{
    this.gameboard = new GameBoard(this.proxy, data);
  }
  catch(e){
    throw new TypeError('invalid gameboard model');
  }
  for (var x in data.players) {
    if (data.players[x].playerID == this.playerID) {
      this.playerIndex = +x;
      break;
    }
  }
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

//---------------------------------------------------------------------------------------
//Functions called by multiple controllers
//---------------------------------------------------------------------------------------

/**
 * Get the player whose turn it is
 * @return {Player} current player
 */
ClientModel.prototype.getCurrentPlayer = function() {
  return this.gameboard.getPlayerByIndex(this.gameboard.turnTracker.currentPlayerIndex())
}

/**
 * Get the player 
 * @return {Player} Client player
 */
ClientModel.prototype.getClientPlayer = function() {
  return this.gameboard.getPlayerByIndex(this.playerIndex)
}

/**
 * Identifies if is the client player's turn
 * @return {Boolean} true when
 */
ClientModel.prototype.isMyTurn = function(){
  return this.playerIndex == this.gameboard.turnTracker.currentPlayerIndex();
}

/**
 * Issues command to end the current player's turn
 * @return {void} 
 */
ClientModel.prototype.endMyTurn = function(){
  if(this.canEndTurn())
    this.gameboard.turnTracker.finishTurn();
}

/**
 * Gets current status from turn tracker
 * @return {string} Status of the turn tracker { Rolling, Robbing, Playing, Discarding, FirstRound, SecondRound }
 */
ClientModel.prototype.getCurrentStatus = function(){
  return this.gameboard.turnTracker.status;
}

//---------------------------------------------------------------------------------------
//Functions called by CardController
//---------------------------------------------------------------------------------------

/**
 * Checks to see if the client player can play the road building card. They
 * must have the card and at least one road.
 * @return {boolean}
 */
ClientModel.prototype.canPlayerPlayRoadBuilding = function () {
  return this.getClientPlayer().canPlayRoadBuilding() && this.getClientPlayer().roads >= 2
}

//---------------------------------------------------------------------------------------
//Functions called by CommController
//---------------------------------------------------------------------------------------

ClientModel.prototype.getPlayerByName = function(name){
  return this.gameboard.getPlayerByName(name);
}

ClientModel.prototype.getCommLines = function(commType){

  if(commType == 'chat'){
    return this.chat.chat
  }
  else if(commType == 'log'){
    return this.log.entries
  }
  else{
    console.err("NOT A VALID COMM TYPE");
  }
}

//---------------------------------------------------------------------------------------
//Functions called by DomesticController
//---------------------------------------------------------------------------------------

/**
 * Checks if the player can offer a trade with the given resources
 * @param  {int} tradePlayerIndex who will receive this offer
 * @param  {object} offer            the number of all resources offered/requested
 * @return {boolean}  true only when this is a valid trade                 
 */
ClientModel.prototype.canOfferTrade = function(tradePlayerIndex,offer){
  return this.gameboard.canOfferTrade(this.playerIndex,tradePlayerIndex,offer);
}

/**
 * Checks if client player has received a trade offer
 * @return {boolean} true when the client player has received an offer and has not yet responded
 */
ClientModel.prototype.receivedTradeOffer = function(){
  return this.gameboard.hasReceivedTradeOffer(this.playerIndex);
}

/**
 * Checks if the client player has made an offer AND if the receiver has not responded
 * @return {boolean} true when the client player has sent a trade offer 
 */
ClientModel.prototype.sentTradeOffer = function(){
  return this.gameboard.hasSentTradeOffer(this.playerIndex);
}

/**
 * Returns the name of the player who sent the outstanding trade offer
 * @return {string} Name of trade sender
 */
ClientModel.prototype.getTradeSenderName = function(){
  return this.gameboard.getTradeSenderName();
}

/**
 * Checks if client player has enough resources to accept the outstanding trade offer.
 * @return {Boolean} True if the client player can accept the trade 
 */
ClientModel.prototype.canAcceptTrade = function(){
  return this.gameboard.canAcceptTrade(this.playerIndex);
}

// Build a list of the objects used by the DomesticController
ClientModel.prototype.getDomesticPlayerInfo = function () {
	return this.gameboard.getDomesticPlayerInfo(this.playerIndex);
}

//---------------------------------------------------------------------------------------
//Functions called by MapController
//---------------------------------------------------------------------------------------

/**
 * Get info for the players on a given hex (excluding the current player)
 * @param {HexLocation} hex
 */
ClientModel.prototype.getRobPlayerInfo = function (hex) {
  var currentPlayer = this.playerIndex
    , players = this.gameboard.players
  return this.gameboard.map.playersOnHex(hex).map(function (pid) {
    return players[pid].robInfo(pid)
  }).filter(function (player) {
    return player.playerNum !== currentPlayer && player.cards > 0
  })
}

/**
 * The current player robs another player
 * <pre>
 * Pre-condition: robbedPlayerIndex is not the current player, and the current
 * player is allowed to rob someone.
 * Post-condition (async!): the robbery happens
 *
 * @param {int} robbedPlayerIndex The player to be robbed
 * @param {HexLocation} hex Where the robber is being moved to
 */
ClientModel.prototype.robPlayer = function (robbedPlayerIndex, hex) {
  this.gameboard.robPlayer(this.playerIndex, robbedPlayerIndex, hex)
}

/**
 * Get a map of playerId to color
 * @method getPlayerColors
 * @return {object}
 */
ClientModel.prototype.getPlayerColors = function () {
  return this.gameboard.players.map(function (player) { return player.color })
}

//---------------------------------------------------------------------------------------
//Functions called by MaritimeController
//---------------------------------------------------------------------------------------

ClientModel.prototype.getMaritimeResourceRatios = function() {
  return this.gameboard.map.getResourceRatios(this.getClientPlayer().playerIndex);
}

ClientModel.prototype.getMaritimeGiveOptions = function(ratios) {
  return this.getClientPlayer().getMaritimeGiveOptions(ratios);
}

ClientModel.prototype.getMaritimeGetOptions = function() {
  return this.gameboard.bank.getAvailableResources();
}

//---------------------------------------------------------------------------------------
//Functions called by PointController
//---------------------------------------------------------------------------------------

ClientModel.prototype.getPointStatus = function () {

  var pointStatus = {};

  var clientPlayer = this.getClientPlayer();
  pointStatus.clientPoints = clientPlayer.victoryPoints;

  var players = this.gameboard.players;

  for(var i = 0; i < players.length; i++){
    if(players[i].victoryPoints >= players[i].MAX_GAME_POINTS){
      pointStatus.winner = players[i].name;
      
      if(players[i] == clientPlayer) {
        pointStatus.isClient = true
      } else {
        pointStatus.isClient = false;
      }
      
      break;
    }
  }

  return pointStatus;
}

//---------------------------------------------------------------------------------------
//Functions called by ResourcesController
//---------------------------------------------------------------------------------------

/**
 * Checks to see if the client player can buy a dev card.
 * Checks the bank for number of dev cards and the player for resources
 * @return {boolean}
 */
ClientModel.prototype.canPlayerBuyDevCard = function () {
  return this.getClientPlayer().canBuyDevCard() && this.gameboard.deck.canDrawCard()
}

//---------------------------------------------------------------------------------------
//Functions called by TrackerController
//---------------------------------------------------------------------------------------

/**
 * Determines if a player can finish their turn
 * @return {boolean}             True if the player has finished their turn.
 */
ClientModel.prototype.canEndTurn = function(){
  if(!this.isMyTurn())
    return false;
  if(this.sentTradeOffer())
    return false;
  return this.getCurrentStatus() != 'Rolling';
}
