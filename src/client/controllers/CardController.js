/**
	This is the namespace for development cards
	@module catan.devCards
	@namespace devCards
	*/

module.exports = DevCardController;

var window = window || {};
var catan = window.catan || {};
catan.devCards = catan.devCards || {};

var Controller = require('./BaseController');
var Definitions = require('byu-catan').definitions;

core.forceClassInherit(DevCardController,Controller);

core.defineProperty(DevCardController.prototype, "BuyView");

/**
 * @class DevCardController
 * @constructor
 * @extends misc.BaseController
 * @param {devCards.DevCardView} view
 * @param {devCards.BuyCardView} buyView
 * @param {models.ClientModel} clientModel
 * @param {function} soldierAction
 * @param {function} roadAction
 */
function DevCardController(view, buyView, clientModel, soldierAction, roadAction){
	Controller.call(this,view,clientModel);
	this.setBuyView(buyView);
	this.soldierAction = soldierAction;
	this.roadAction = roadAction;
}

/**
* Called by the client model every time the model changes.
* Overrides onUpdate in BaseController
* @method onUpdate
* @return void
*/
DevCardController.prototype.onUpdate = function() {
	var clientPlayer = this.clientModel.getClientPlayer();

	var playable = {
		SOLDIER: clientPlayer.canPlaySoldier(),
		YEAR_OF_PLENTY: clientPlayer.canPlayYearOfPlenty(),
		MONOPOLY: clientPlayer.canPlayMonopoly(),
		ROAD_BUILD: this.clientModel.canPlayerPlayRoadBuilding(),
		MONUMENT: clientPlayer.canPlayMonument()
	};

	for (var card in playable) {
		this.view.updateAmount(Definitions[card], clientPlayer.getNumberOfDevCards(Definitions[card]));
		this.view.setCardEnabled(Definitions[card], playable[card])
	}
}

/**
 * Called when the player buys a development card
 * @method buyCard
 * @return void
 */
DevCardController.prototype.buyCard = function() {
	this.clientModel.getClientPlayer().buyDevCard();
	this.getBuyView().closeModal();
}

/**
 * Called when the player plays a year of plenty card
 * @method useYearOfPlenty
 * @param {String} resource1 The first resource to obtain
 * @param {String} resource2 The second resource to obtain
 * @return void
 */
DevCardController.prototype.useYearOfPlenty = function(resource1, resource2) {
	this.clientModel.getClientPlayer().yearOfPlenty(resource1, resource2);
	this.view.clearView();
	this.view.closeModal();
}

/**
 * Called when the player plays a monopoly card
 * @method useMonopoly
 * @param {String} resource the resource to obtain
 * @return void
 */
DevCardController.prototype.useMonopoly = function(resource) {
	this.clientModel.getClientPlayer().monopoly(resource);
	this.view.clearView();
	this.view.closeModal();
}

/**
 * Called when the player plays a monument card
 * @method useMonument
 * @return void
 */
DevCardController.prototype.useMonument = function() {
	this.clientModel.getClientPlayer().playMonument();
	this.view.closeModal();
}

/**
 * Called when the player plays a soldier card
 * @method useSoldier
 * @return void
 */
DevCardController.prototype.useSoldier = function() {
	this.soldierAction();
	this.view.closeModal();
}

/**
 * Called when the player plays the road building card
 * @method useRoadBuild
 * @return void
 */
DevCardController.prototype.useRoadBuild = function() {
	this.roadAction();
	this.view.closeModal();
}
