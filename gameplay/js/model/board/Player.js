
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
 * to build.
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
 * @return {List<CardType>} A list of the types that the player has to play
 */
Player.prototype.playableDevelopmentCards = function () {
};

// mutable!

/**
 * Buy a development card
 * <pre>
 * Pre-condition: The player has enough resources
 * Post-consition: The player has another development card (async!) and they
 * discard the corresponding resources.
 * </pre>
 * @method buyDevCard
 * @return {void}
 */
Player.prototype.buyDevCard = function () {
};

/**
 * Play a year of plenty card
 * <pre>
 * Pre-condition: They have a year of plenty card, and the bank has the
 * resources available, and it's their turn
 * Post-condition: They have the chosen resources, and they discard the year
 * of plenty card (async!)
 * </pre>
 * @method yearOfPlenty
 * @param {DevCardResource} resource1
 * @param {DevCardResource} resource2
 * @return {void}
 */
Player.prototype.yearOfPlenty = function (resource1, resource2) {
};

/**
 * Play a road building card
 * <pre>
 * Pre-condition: they have the card and two unused roads, and it's their turn
 * Post-condition: they discard the card and the two roads are created.
 * </pre>
 * @method roadBuilding
 * @param {EdgeLocation} edge1
 * @param {EdgeLocation} edge2
 * @return {void}
 */
Player.prototype.roadBuilding = function (edge1, edge2) {
};

/**
 * Play a soldier card
 * <pre>
 * Pre-condition: the player has a soldier, and the hex location is valid, and
 * it's their turn, and the robbed player is on the hexlocation and has more
 * than one card.
 * Post-condition: the player has played the soldier, and taken a resource
 * card from the other player, and put the soldier card in their army.
 * (async!)
 * </pre>
 * @method playSoldier
 * @param {HexLocation} hex
 * @param {int} robbedPlayer ID
 * @return {void}
 */
Player.properties.playSoldier = function (hex, robbedPlayer) {
};

// these still need to be done

/*
+ monopoly(int,int)
+ monument(int)
+ offerTrade(int,CardParams,int)
+ acceptTrade(int,bool)
+ discardCards(int,CardParams)
*/

