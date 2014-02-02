
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
function Player(proxy, data) {
	// set things up
}

// read-only functions

/**
 * What can this player build?
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method whatCanYouBuild
 * @return {List<string>} A list of the things that the player has resources
 * to build/buy.
**/
Player.prototype.whatCanYouBuild = function () {
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
Player.properties.playSoldier = function (hex, playerToRob) {
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
Player.properties.monopoly = function (resourceType) {
};

/**
* Play a Monument card.
* <pre>
* Pre-condition: It is the player's turn, the player has 10 victory points
* (counting points from Monument cards), and the player has a Monument card.
* Post-condition: The player receives a victory point.
* (async!)
* </pre>
* @method monument
* @return {void}
*/
Player.properties.monument = function () {
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
* @param {CardParams} cardsOffered
* @param {int} playerToTradeWith
* @return {void}
*/
Player.properties.offerTrade = function (cardsOffered, playerToTradeWith) {
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
Player.properties.acceptTrade = function (willAccept) {
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
* @param {CardParams} cardsToDiscard
* @return {void}
*/
Player.properties.discardCards = function (cardsToDiscard) {
};