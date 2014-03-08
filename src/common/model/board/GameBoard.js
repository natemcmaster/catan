var Bank = require('./Bank');
var Deck = require('./Deck');
var Map = require('./map/Map');
var Player = require('./Player');
var TurnTracker = require("./TurnTraker");
var TradeOffer = require('./TradeOffer');
var Definitions = require('byu-catan').definitions;
var ResourceTypes = Definitions.ResourceTypes;

var RobPlayerCommand = require('../commands/RobPlayerCommand');

module.exports = GameBoard;


/**
 * <pre>
 * Invariant: The game has a full number of players. 
 * </pre>
 * GameBoard is the master model that manages all models needed to play the game
 * @constructor
 * @class GameBoard
 * @param {model.proxy} proxy Proxy responsiple for communication with the server
 */
function GameBoard(proxy, data) {
	if(!data || !data.bank || !data.map || !data.deck || !data.players)
		throw new TypeError('invalid gameboard model');
	this.proxy = proxy;
	this.bank = new Bank(proxy, data.bank);
	this.biggestArmyOwner = data.biggestArmy;
	this.deck = new Deck(proxy, data.deck);
	this.longestRoadOwner = data.longestRoad;
	this.map = new Map(proxy, data.map);
	
	var players = this.players = [];
	data.players.forEach(function(player, index){
		players.push(new Player(proxy, player, index));
	});

	this.turnTracker = new TurnTracker(proxy, data.turnTracker);
	this.winner = data.winner;
	this.tradeOffer = data.tradeOffer ? new TradeOffer(data.tradeOffer) : false;

}

/**
 * <pre>
 * Pre-condition: Id must be valid
 * Post-condition: Returns complete player information
 * </pre>
 * Get information about a player in the game.
 * @method getPlayerByID
 * @param  {int} id The id of the player
 * @return {Player}       Returns the player object
 */
GameBoard.prototype.getPlayerByID = function(id){
	return this.players.filter(function(s){
		return s.playerID == id;
	})[0];
};

/**
 * Returns the player INDEX (not ID). As indexed by the players object.
 * @param  {[type]} index Index of player
 * @return {Player}       The player responding
 */
GameBoard.prototype.getPlayerByIndex = function(index){
	return this.players[index];
}

/**
 * <pre>
 * Pre-condition: give a valid string
 * Post-conition: returns only the first player with the name, or undefined if not player has that name
 * </pre>
 * Get the player by their first name
 * @param  {string} name Name of the player
 * @return {Player}      The first player with this name.
 */
GameBoard.prototype.getPlayerByName = function(name) {
  for(var i = 0; i < this.players.length; i++){
    if(this.players[i].name == name){
      return this.players[i];
    }
  }
  console.err('BAD PLAYER NAME');
}

/**
 * <pre>
 * Pre-condition: none
 * Post-condition: none
 * </pre>
 * Determines if the game is over, either due to a winner or exceptional conditions
 * @method isGameOver
 * @return {Boolean} True when the game is over
 */
GameBoard.prototype.isGameOver = function(){
	if(this.winner >= 0 && this.winner <= 3){
		return true;
	} else {
		return false;
	}
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method bigArmyOwner
@return {int} ID of player who owns the biggest army. Returns -1 if no player has largest army award. 

**/
GameBoard.prototype.bigArmyOwner = function () {
	return this.biggestArmyOwner;
};

/**
<pre>
Pre-condition: Game is over
Post-condition: Return id of player with most points
</pre>
@method getWinner
@return {int} ID of player with most points. El Conquistador!

**/
GameBoard.prototype.getWinner = function () {
	return this.winner;
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method longRoadOwner
@return {int} ID of player with the longest road. Return -1 if no player owns this award.

**/
GameBoard.prototype.longRoadOwner = function () {
	return this.longestRoadOwner;
};

/**
 * <pre>
 * Pre-condition: The game is not over. The thief is allowed to move the robber and it is their turn. ThiefId and VictimId are valid. Hex is a valid hex
 * Postcondition: Will change the card thief's and victim's card count, and move the robber location (async!)
 * </pre>
 * 
 * Moves the robber and allows the thief to steal cards
 * @method robPlayer
 * @param  {int} thiefId  The player stealing the cards
 * @param  {int} victimId The player getting stolen from
 * @param  {HexLocation} hex Where the robber is being moved to   
 * @return {null}        nothing
 */
GameBoard.prototype.robPlayer = function(thiefId, victimId, hex) {
	this.proxy.executeCommand(new RobPlayerCommand(thiefId, victimId, hex));
	
}

/**
 * Prepares the object with relevant information for the turn tracker controller t ouse
 * @param  {int} playerIndex Index of the player
 * @return {object}             Contains settings about the player
 */
GameBoard.prototype.toTurnTracker = function(playerIndex){
	var p = this.players[playerIndex];
	return {
		'playerIndex': playerIndex,
		'score': p.victoryPoints,
		'highlight': (playerIndex == this.turnTracker.currentPlayerIndex()),
		'army': p.largestArmy,
		'road': p.longestRoad
	}
}

/*
Trading functionality
 */

/**
 * Checks if the player can offer a trade with the given resources
 * @param {int} playerIndex the index of the player making the offer
 * @param  {int} tradePlayerIndex who will receive this offer
 * @param  {object} offer            the number of all resources offered/requested
 * @return {boolean}  true only when this is a valid trade                 
 */
GameBoard.prototype.canOfferTrade = function(playerIndex,tradePlayerIndex,offer){
  var player = this.getPlayerByIndex(playerIndex);
  if(!this.getPlayerByIndex(tradePlayerIndex))
    return false;
  
  for(var i in ResourceTypes){
    var r = ResourceTypes[i];
    if(player.resources[r] < offer[r])
      return false;
  }
  return true;
}

/**
 * Checks if client player has received a trade offer
 * @param {int} playerIndex the index of the player in question
 * @return {boolean} true when the client player has received an offer and has not yet responded
 */
GameBoard.prototype.hasReceivedTradeOffer = function(playerIndex){
  if(!this.tradeOffer)
    return false;
  return this.tradeOffer.receiverIndex == playerIndex;
}

/**
 * Checks if the client player has made an offer AND if the receiver has not responded
 * @param {int} playerIndex the index of the player in question
 * @return {boolean} true when the client player has sent a trade offer 
 */
GameBoard.prototype.hasSentTradeOffer = function(playerIndex){
  if(!this.tradeOffer)
    return false;
  return this.tradeOffer.senderIndex == playerIndex;
}

/**
 * Returns the name of the player who sent the outstanding trade offer
 * @return {string} Name of trade sender
 */
GameBoard.prototype.getTradeSenderName = function(){
  return this.getPlayerByIndex(this.tradeOffer.senderIndex).name;
}

/**
 * <pre>
 * Pre-condition: player has received an ovver
 * Post-condition: it is correct
 * </pre>
 * Checks if client player has enough resources to accept the outstanding trade offer.
 * @param {int} playerIndex the index of the player in question
 * @return {Boolean} True if the player can accept the trade 
 */
GameBoard.prototype.canAcceptTrade = function(playerIndex){
  if(!this.hasReceivedTradeOffer(playerIndex))
    return false;
  var receiver = this.getPlayerByIndex(this.tradeOffer.receiverIndex);
  for(var i in ResourceTypes){
    var r = ResourceTypes[i];
    if(Math.abs(this.tradeOffer.offer[r]) > receiver.resources[r] && this.tradeOffer.offer[r] < 0)
      return false;
  }
  return true;
}

/**
 * Build a list of the objects with information about all players that client player can trade with
 * @param {int} playerIndex the client player
 * @return {Array} List of name, color, and player index for al lplayers
 */
GameBoard.prototype.getDomesticPlayerInfo = function (playerIndex) {
	var otherPlayers = [];
	for (var i in this.players) {
		if (i != playerIndex) {
			otherPlayers.push({
				name: this.players[i].name,
				color: this.players[i].color,
				index: this.players[i].playerIndex,
			});
		}
	}
  return otherPlayers;
}