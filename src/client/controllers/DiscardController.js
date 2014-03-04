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
/**
	Called by the view when the player clicks the discard button.
	It should send the discard command and allow the game to continue.
	@method discard
	@return void
	*/	
DiscardController.prototype.discard = function(){

	this.clientModel.getClientPlayer().discardCards(
								  this.brickToDiscard,
								  this.oreToDiscard,
								  this.sheepToDiscard,
								  this.wheatToDiscard,
								  this.woodToDiscard);

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
	if(resource == 'wheat'){
		this.wheatToDiscard++;
	}
	else if(resource == 'wood'){
		this.woodToDiscard++;
	}
	else if(resource == 'ore'){
		this.oreToDiscard++;
	}
	else if(resource == 'brick'){
		this.brickToDiscard++;
	}
	else if(resource == 'sheep'){
		this.sheepToDiscard++;
	}
	else{
		console.err('UNEXPECTED RESOURCE TYPE');
	}
	
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
	if(resource == 'wheat'){
		this.wheatToDiscard--;
	}
	else if(resource == 'wood'){
		this.woodToDiscard--;
	}
	else if(resource == 'ore'){
		this.oreToDiscard--;
	}
	else if(resource == 'brick'){
		this.brickToDiscard--;
	}
	else if(resource == 'sheep'){
		this.sheepToDiscard--;
	}
	else{
		console.err('UNEXPECTED RESOURCE TYPE');
	}

	this.enableButtons();
	this.updateStateMessage();
	this.setDiscardAmounts();
}

DiscardController.prototype.onUpdate = function(){
	
	if(this.clientModel.getCurrentStatus() != 'Discarding'){
		return;
	}

	var clientPlayer = this.clientModel.getClientPlayer()

	this.clientOre = clientPlayer.resources.ore
	this.clientSheep = clientPlayer.resources.sheep
	this.clientBrick = clientPlayer.resources.brick
	this.clientWheat = clientPlayer.resources.wheat
	this.clientWood = clientPlayer.resources.wood

	var totalRecources = this.clientWood + this.clientWheat + this.clientBrick + this.clientSheep + this.clientOre
	this.numToDiscard = parseInt(totalRecources/2)

	if (clientPlayer.hasToDiscard()) {

		this.view.showModal();
		this.updateStateMessage();
		this.setMaxDiscardAmounts();
		this.enableButtons();
		this.setDiscardAmounts();

	}	
}
DiscardController.prototype.enableButtons = function(){
	var reachedMaxed = (this.numToDiscard == this.numSelected)

	var sheepUp =false
	var sheepDown =false
	var oreUp =false
	var oreDown =false
	var woodUp = false
	var woodDown = false
	var wheatUp = false
	var wheatDown = false
	var brickUp = false
	var brickDown = false


	if(this.sheepToDiscard > 0){
		sheepDown = true;
	}
	if(this.sheepToDiscard < this.clientSheep && !reachedMaxed){
		sheepUp = true;
	}
	if(this.oreToDiscard > 0){
		oreDown = true;
	}
	if(this.oreToDiscard < this.clientOre && !reachedMaxed){
		oreUp = true;
	}
	if(this.brickToDiscard > 0){
		brickDown = true;
	}
	if(this.brickToDiscard < this.clientBrick && !reachedMaxed){
		brickUp = true;
	}
	if(this.woodToDiscard > 0){
		woodDown = true;
	}
	if(this.woodToDiscard < this.clientWood && !reachedMaxed){
		woodUp = true;
	}
	if(this.wheatToDiscard > 0){
		wheatDown = true;
	}
	if(this.wheatToDiscard < this.clientWheat && !reachedMaxed){
		wheatUp = true;
	}


	this.view.setResourceAmountChangeEnabled('ore', oreUp, oreDown);
	this.view.setResourceAmountChangeEnabled('wheat', wheatUp, wheatDown);
	this.view.setResourceAmountChangeEnabled('brick', brickUp, brickDown);
	this.view.setResourceAmountChangeEnabled('sheep', sheepUp, sheepDown);
	this.view.setResourceAmountChangeEnabled('wood', woodUp, woodDown);

	this.view.setDiscardButtonEnabled(reachedMaxed);
}
DiscardController.prototype.setMaxDiscardAmounts = function(){
	this.view.setResourceMaxAmount('ore', this.clientOre);
	this.view.setResourceMaxAmount('wheat', this.clientWheat);
	this.view.setResourceMaxAmount('wood', this.clientWood);
	this.view.setResourceMaxAmount('sheep', this.clientSheep);
	this.view.setResourceMaxAmount('brick', this.clientBrick);
}
DiscardController.prototype.setDiscardAmounts = function(){

	this.view.setResourceAmount('wheat', this.wheatToDiscard)
	this.view.setResourceAmount('wood', this.woodToDiscard)
	this.view.setResourceAmount('ore', this.oreToDiscard)
	this.view.setResourceAmount('brick', this.brickToDiscard)
	this.view.setResourceAmount('sheep', this.sheepToDiscard)	
}
DiscardController.prototype.updateStateMessage = function(){
	this.view.setStateMessage( this.numSelected + '/' + this.numToDiscard)
}
