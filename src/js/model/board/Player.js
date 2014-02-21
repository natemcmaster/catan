
var commands = require('../commands');

/**
 * The Player Object
 *
 * @module catan.model.board
 * @namespace board
 */

module.exports = Player;

/**
 * The player object
 * <pre>
 * Invariant: NONE
 * </pre>
 * @class Player
 * @constructor
 */
function Player(proxy, player) {
	// set things up
	this.proxy = proxy;
	this.MAX_GAME_POINTS = player.MAX_GAME_POINTS;
	this.cities = player.cities;
	this.color = player.color;
	this.discarded = player.discarded;
	this.largestArmy = player.largestArmy;
	this.longestRoad = player.longestRoad;
	this.monuments = player.monuments;
	this.name = player.name;
	this.newDevCards = player.newDevCards;
	this.oldDevCards = player.oldDevCards;
	this.orderNumber = player.orderNumber;
	this.playedDevCard = player.playedDevCard;
	this.playerID = player.playerID;
	this.resources = player.resources;
	this.roads = player.roads;
	this.settlements = player.settlements;
	this.soldiers = player.soldiers;
	this.victoryPoints = player.victoryPoints;
}

// read-only functions

/**
 * Generate the object for robbing
 * <pre>
 * Returned object looks like: {color:, name:, playerNum:, cards:}
 * </pre>
 *
 * @returns object
 */
Player.prototype.robInfo = function () {
  var cards = 0
  for (var type in this.resources) {
    cards += this.resources[type]
  }
  return {
    color: this.color,
    name: this.name,
    playerNum: this.playerID,
    cards: cards
  }
}

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method canBuyRoad
@return {bool} canBuy whether or not you can buy a road
*/
Player.prototype.canBuyRoad = function () {

	if(this.resources.brick >= 1 && 
	   this.resources.wood >= 1 &&
	   this.roads >=1)
		return true;
	else
		return false;
};
/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method canBuySettlement
@return {bool} canBuy whether or not you can buy a settlement
*/
Player.prototype.canBuySettlement = function () {

	if(this.resources.brick >= 1 &&
	   this.resources.wood >= 1 &&
	   this.resources.sheep >= 1 &&
	   this.resources.wheat >= 1 &&
	   this.settlements >= 1)
		return true;
	else
		return false;
};
/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method canBuyCity
@return {bool} canBuy whether or not you can buy a city
*/
Player.prototype.canBuyCity = function () {

	if(this.resources.ore >= 3 && 
	   this.resources.wheat >= 2 &&
	   this.cities >=1)
		return true;
	else
		return false;
};
/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method canBuyDevCard
@return {bool} canBuy whether or not you can buy a Dev Card
*/
Player.prototype.canBuyDevCard = function () {

	if(this.resources.ore >= 1 &&
	   this.resources.sheep >= 1 &&
	   this.resources.wheat >= 1)
		return true;
	else
		return false;
};
/**
 * Get a list of the playable development cards.
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method playableDevelopmentCards
 * @return {List<CardType>} A list of the development cards that the player 
 * can play on this turn.
 */
Player.prototype.playableDevelopmentCards = function () {

	return this.oldDevCards; //TODO: add monument cards from the new hand
	
};

Player.prototype.canPlayDevCard = function() {
	return (this.canPlayYearOfPlenty() || 
			this.canPlayRoadBuilding() || 
			this.canPlaySoldier() || 
			this.canPlayMonopoly() || 
			this.canPlayMonument());
}

/**
 * Can the player play a Year of Plenty card?
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method canPlayYearOfPlenty
 * @return {bool} true if the player has not already played
 * a development card on their turn and they have a Year of
 * Plenty card bought on a previous turn, false otherwise
 */
Player.prototype.canPlayYearOfPlenty = function () {
	if (!this.playedDevCard() && this.oldDevCards.yearOfPlenty > 0)
		return true;
	else
		return false;
};

/**
 * Can the player play a Road Building card?
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method canPlayRoadBuilding
 * @return {bool} true if the player has not already played
 * a development card on their turn and they have a Road
 * Building card bought on a previous turn, false otherwise
 */
Player.prototype.canPlayRoadBuilding = function () {
	if (!this.playedDevCard() && this.oldDevCards.roadBuilding > 0)
		return true;
	else
		return false;
};

/**
 * Can the player play a Soldier card?
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method canPlaySoldier
 * @return {bool} true if the player has not already played
 * a development card on their turn and they have a Soldier
 * card bought on a previous turn, false otherwise
 */
Player.prototype.canPlaySoldier = function () {
	if (!this.playedDevCard() && this.oldDevCards.soldier > 0)
		return true;
	else
		return false;
};

/**
 * Can the player play a Monopoly card?
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method canPlayMonopoly
 * @return {bool} true if the player has not already played
 * a development card on their turn and they have a Monopoly
 * card bought on a previous turn, false otherwise
 */
Player.prototype.canPlayMonopoly = function () {
	if (!this.playedDevCard() && this.oldDevCards.monopoly > 0)
		return true;
	else
		return false;
};

/**
 * Can the player play a Monument card?
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method canPlayMonument
 * @return {bool} true if the player at least one monument card
 * and if he plays all his monument cards he will have at least
 * 10 victory points (monument cards are not revealed unless you
 * can win the game)
 */
Player.prototype.canPlayMonument = function () {
	
	//Monument cards are immediately playable if you have enough to win the game
	var numMonumentCards = this.oldDevCards.monument + this.newDevCards.monument;

	if (numMonumentCards > 0 && numMonumentCards + this.victoryPoints >= 10)
		return true;
	else
		return false;
};

// mutable!

/**
 * Buy a development card.
 * <pre>
 * Pre-condition: It is the player's turn, the player hasn't played a development
 * card on this turn yet, the player has the resources to buy a development card, 
 * and there is at least one development card left in the deck.
 * Post-consition: The player discards the resources required to buy a development 
 * card, gets a development card (but can't play it on this turn), and the deck 
 * has one less development card.
 * (async!)
 * </pre>
 * @method buyDevCard
 * @return {void}
 */
Player.prototype.buyDevCard = function () {
	this.proxy.executeCommand(new commands.BuyDevCardCommand(this.playerID));
};

/**
 * Play a Year of Plenty card.
 * <pre>
 * Pre-condition: It is the player's turn, the player hasn't played a development
 * card on this turn yet, the player has a Year of Plenty card, and the bank has
 * the selected resources.
 * Post-condition: The player discards the Year of Plenty card, and gets the selected
 * resources.
 * (async!)
 * </pre>
 * @method yearOfPlenty
 * @param {Resource} resource1
 * @param {Resource} resource2
 * @return {void}
 */
Player.prototype.yearOfPlenty = function (resource1, resource2) {
	this.proxy.executeCommand(new commands.PlayYearOfPlentyCommand(this.playerID, resource1, resource2));
};

/**
 * Play a Road Building card.
 * <pre>
 * Pre-condition: It is the player's turn, the player hasn't played a development
 * card on this turn yet, the player has a Road Building card, the player has two 
 * unused roads, and there are two edges the player can legally place those roads on.
 * Post-condition: The player discards the Road Building card, and now has roads
 * on the selected edges on the map.
 * </pre>
 * @method roadBuilding
 * @param {EdgeLocation} edge1
 * @param {EdgeLocation} edge2
 * @return {void}
 */
Player.prototype.roadBuilding = function (edge1, edge2) {
	this.proxy.executeCommand(new commands.PlayRoadBuildingCommand(this.playerID, edge1, edge2));
};

/**
 * Play a Soldier card.
 * <pre>
 * Pre-condition: It is the player's turn, the player hasn't played a development
 * card on this turn yet, the player has a Soldier card, and the robber is being 
 * moved to a valid new hex location.
 * Post-condition: The player discards the Soldier card, adds another soldier to
 * his/her army, the robber has been moved to a valid new location, and the player
 * being robbed has given a random resource card to the player who played the
 * Soldier card.
 * (async!)
 * </pre>
 * @method playSoldier
 * @param {HexLocation} hex
 * @param {int} playerToRob
 * @return {void}
 */
Player.prototype.playSoldier = function (hex, playerToRob) {
	this.proxy.executeCommand(new commands.PlaySoldierCommand(this.playerID, playerToRob, hex));
};

/**
* Play a Monopoly card.
* <pre>
* Pre-condition: It is the player's turn, the player hasn't played a development
* card on this turn yet, and the player has a Monopoly card.
* Post-condition: The player takes all resource cards of that type from all
* other players.
* (async!)
* </pre>
* @method monopoly
* @param {Resource} resourceType
* @return {void}
*/
Player.prototype.monopoly = function (resourceType) {
	this.proxy.executeCommand(new commands.PlayMonopolyCommand(this.playerID,resourceType));
};


/**
* Offer a trade to another player.
* <pre>
* Pre-condition: It is the player's turn or the offer is being made to the player
* whose turn it is. The player has the resources being offered.
* Post-condition: An offer has been made to another player.
* (async!)
* </pre>
* @method offerTrade
* @param {int} playerToTradeWith
* @param {int} brick number of brick offered
* @param {int} ore number of ore offered
* @param {int} sheep number of sheep offered
* @param {int} wheat number of wheat offered
* @param {int} wood number of wood offered
* @return {void}
*/
Player.prototype.offerTrade = function (playerToTradeWith, brick, ore, sheep, wheat, wood) {
	this.proxy.executeCommand(new commands.OfferTradeCommand(this.playerID, playerToTradeWith,
											 brick, ore, sheep, wheat, wood));
};

/**
* Accept a trade offer.
* <pre>
* Pre-condition: The player made the trade offer and if accepting has the resources
* to trade. It is either his/her turn or the turn of the player he/she is trading with.
* Post-condition: If accepted, the players have swapped the selected resource cards.
* If rejected, nothing is modified. In either case, the trade offer is removed.
* (async!)
* </pre>
* @method acceptTrade
* @param {bool} willAccept
* @return {void}
*/
Player.prototype.acceptTrade = function (willAccept) {

	this.proxy.executeCommand(new commands.AcceptTradeCommand(this.playerID,willAccept));

};

/**
* Discard cards when a 7 is rolled.
* <pre>
* Pre-condition: A 7 has been rolled (the client model state is 'discarding'), the player has more than 7 cards,
* and the player has the cards he/she selected to discard.
* Post-condition: The player has discarded half of his/her cards.
* (async!)
* </pre>
* @method discardCards
* @param {int} brick number of brick discarded
* @param {int} ore number of ore discarded
* @param {int} sheep number of sheep discarded
* @param {int} wheat number of wheat discarded
* @param {int} wood number of wood discarded
* @return {void}
*/
Player.prototype.discardCards = function (brick, ore, sheep, wheat, wood) {
	this.proxy.executeCommand(new commands.DiscardCardsCommand(this.playerID, 
												brick, ore, sheep, wheat, wood));
};

/**
 * Plays the "Monument Card" aka the victory point card
 * <pre>
 * Pre-condition: the player has a monument card
 * Post-condition: the player's victory points increase by one
 * </pre>
 * @method playMonument
 * @return {void}
 */
Player.prototype.playMonument = function(){
	this.proxy.executeCommand(new commands.PlayMonumentCommand(this.playerID));
}

/**
 * Make a maritime trade.
 * <pre>
 * Pre-condition: The player has a settlement next to a port. Also, the bank must have at least one output type.
 * Post-condition: Player trades the number (ratio) of input type resources for output type resources
 * @param  {int} ratio              How many to of inputType must be supplied to obtain one output type
 * @param  {ResourceType} inputResourceType  What type to trade
 * @param  {ResourceType} outputResourceType What type to obtain
 * @return {void}                    
 */
Player.prototype.maritimeTrade = function(ratio,inputResourceType,outputResourceType){
	this.proxy.executeCommand(new commands.MaritimeTradeCommand(this.playerID,ratio,inputResourceType,outputResourceType));
}
