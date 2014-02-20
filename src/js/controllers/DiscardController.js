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
	
}

core.forceClassInherit(DiscardController,Controller);

core.defineProperty(DiscardController.prototype,"waitingView");

/**
	Called by the view when the player clicks the discard button.
	It should send the discard command and allow the game to continue.
	@method discard
	@return void
	*/	
DiscardController.prototype.discard = function(){
}

/**
	Called by the view when the player increases the amount to discard for a single resource.
	@method increaseAmount
	@param {String} resource the resource to discard
	@return void
	*/
DiscardController.prototype.increaseAmount = function(resource){
	

}

/**
	Called by the view when the player decreases the amount to discard for a single resource.
	@method decreaseAmount
	@param {String} resource the resource to discard
	@return void
	*/
DiscardController.prototype.decreaseAmount = function(resource){
}

DiscardController.prototype.onUpdate = function(){
	var clientPlayer = this.clientModel.getClientPlayer()

	this.clientOre = clientPlayer.resources.ore
	this.clientSheep = clientPlayer.resources.sheep
	this.clientBrick = clientPlayer.resources.brick
	this.clientWheat = clientPlayer.resources.wheat
	this.clientWood = clientPlayer.resources.wood

	var totalRecources = this.clientWood + this.clientWheat + this.clientBrick + this.clientSheep + this.clientOre
	this.numToDiscard = parseInt(totalRecources/2)

	if(this.numToDiscard >= 4){
		

		this.view.setStateMessage( this.numSelected + '/' + this.numToDiscard)
		this.view.showModal()
	}
	
}

DiscardController.prototype.initVariables = function(){

	this.numToDiscard = 0

	this.sheepToDiscard = 0
	this.oreToDiscard = 0
	this.woodToDiscard = 0
	this.wheatToDiscard = 0
	this.brickToDiscard = 0

	this.clientOre = 0
	this.clientSheep = 0
	this.clientBrick = 0
	this.clientWheat = 0
	this.clientWood = 0

	this.numSelected = 0

}

