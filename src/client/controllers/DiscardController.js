//STUDENT-EDITABLE-BEGIN
/**
	This is the namespace for discarding cards
	@module catan.discard
	@namespace discard
	*/

module.exports = DiscardController

var Controller = require('./BaseController');
var window = window || {};
var catan = window.catan || {};
var Definitions = require('byu-catan').definitions;
var ResourceTypes = Definitions.ResourceTypes;

/**
 * @class DiscardController
 * @constructor
 * @extends misc.BaseController
 * @param{discard.DiscardView} view
 * @param{misc.WaitOverlay} waitingView
 * @param{models.ClientModel} clientModel
 */

function DiscardController(view, waitingView, clientModel){
	Controller.call(this,view,clientModel);

	view.setController(this);

	waitingView.setController(this);
	this.setWaitingView(waitingView);

	this.initVariables();

  // this.onUpdate();

}

core.forceClassInherit(DiscardController,Controller);

core.defineProperty(DiscardController.prototype,"waitingView");

DiscardController.prototype.initVariables = function(){

	this.discarding = {
		ore: 0,
		wood: 0,
		sheep: 0,
		wheat: 0,
		brick: 0
	}

	this.posessions = {
		ore: 0,
		wood: 0,
		sheep: 0,
		wheat: 0,
		brick: 0
	}

	this.numToDiscard = 0
	this.numSelected = 0

}
/**
	Called by the view when the player clicks the discard button.
	It should send the discard command and allow the game to continue.
	@method discard
	@return void
	*/	
DiscardController.prototype.discard = function(){

	var resource_order = ['brick', 'ore', 'sheep', 'wheat', 'wood']
	  , player = this.clientModel.getClientPlayer();

	player.discardCards.apply(player, resource_order.map(function (res) {
		return this.discarding[res]
	}.bind(this)))

	this.view.closeModal();
	this.initVariables();
}

/**
	Called by the view when the player increases the amount to discard for a single resource.
	@method increaseAmount
	@param {String} resource the resource to discard
	@return void
	*/
DiscardController.prototype.increaseAmount = function(resource){
	this.numSelected++;
	if ('undefined' === typeof this.discarding[resource]) {
		console.err('UNEXPECTED RESOURCE TYPE');
		return
	}
	this.discarding[resource]++;

	this.enableButtons();
	this.updateStateMessage();
	this.setDiscardAmounts();
}

/**
	Called by the view when the player decreases the amount to discard for a single resource.
	@method decreaseAmount
	@param {String} resource the resource to discard
	@return void
	*/
DiscardController.prototype.decreaseAmount = function(resource){
	this.numSelected--;
	if ('undefined' === typeof this.discarding[resource]) {
		console.err('UNEXPECTED RESOURCE TYPE');
		return
	}
	this.discarding[resource]--;

	this.enableButtons();
	this.updateStateMessage();
	this.setDiscardAmounts();
}

DiscardController.prototype.onUpdate = function(){

	if(this.clientModel.getCurrentStatus() != 'Discarding'){
		return;
	}

	var clientPlayer = this.clientModel.getClientPlayer()
	  , totalPosessed = 0;

	for (var resource in this.posessions) {
		this.posessions[resource] = clientPlayer.resources[resource];
		totalPosessed += clientPlayer.resources[resource];
	}

	this.numToDiscard = parseInt(totalPosessed / 2);

	if (clientPlayer.hasToDiscard()) {
		this.view.showModal();
		this.updateStateMessage();
		this.setMaxDiscardAmounts();
		this.enableButtons();
		this.setDiscardAmounts();
	}	
}

// TODO: this could be further optimized
DiscardController.prototype.enableButtons = function(){
	var reachedMaxed = (this.numToDiscard == this.numSelected)

	for (var resource in this.posessions) {
		this.view.setResourceAmountChangeEnabled(
			resource,
			this.discarding[resource] < this.posessions[resource] && !reachedMaxed,
			this.discarding[resource] > 0
		);
	}

	this.view.setDiscardButtonEnabled(reachedMaxed);
}

DiscardController.prototype.setMaxDiscardAmounts = function(){
	for (var resource in this.posessions) {
		this.view.setResourceMaxAmount(resource, this.posessions[resource]);
	}
}

DiscardController.prototype.setDiscardAmounts = function(){
	for (var resource in this.discarding) {
		this.view.setResourceAmount(resource, this.discarding[resource]);
	}
}

DiscardController.prototype.updateStateMessage = function(){
	this.view.setStateMessage( this.numSelected + '/' + this.numToDiscard)
}

