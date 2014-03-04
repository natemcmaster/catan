// inputResource is undefined when 3:1
// inputResrouce is the resrouce if 2:1
// Loop through each port and ass

//STUDENT-EDITABLE-BEGIN
/**
	This is the namespace for maritime trading
	@module catan.trade
	@submodule catan.trade.maritime
	@namespace maritime
	*/

module.exports = MaritimeController;

var Definitions = require('byu-catan').definitions;
var ResourceTypes = Definitions.ResourceTypes;

var Controller = require('./BaseController');

/**
	Initialization...highlight and unhiglight resrouces to give based on what the player has.
	@class MaritimeController
	@constructor 
	@extends misc.BaseController
	@param {maritime.View} view
	@param {models.ClientModel} clientModel
	*/
function MaritimeController(view,clientModel){
	Controller.call(this,view,clientModel);
	this.clientModel = clientModel;
	this.resourceToGive = null;
	this.resourceToGet = null;
};

MaritimeController.prototype = core.inherit(Controller.prototype);

/**
*  onUpdate
*/
MaritimeController.prototype.onUpdate = function(){
	if(this.clientModel.isMyTurn() && this.clientModel.getCurrentStatus() == "Playing") {
		this.view.showGiveOptions(this.clientModel.getMaritimeGiveOptions());
		this.view.hideGetOptions();
		this.view.enableTradeButton(false);
		this.view.setMessage("Choose the resource you want to give");
	}
	else {
		this.view.hideGiveOptions();
		this.view.enableTradeButton(false);
		this.view.hideGetOptions();
		this.view.setMessage("Wait for your turn...");
	}
};

/**
 * Called by the view when the player "undoes" their give selection
 * @method unsetGiveValue
 * @return void
 */
MaritimeController.prototype.unsetGiveValue = function(){
	this.resourceToGive = null;
	this.view.enableTradeButton(false);
	this.view.showGiveOptions(this.clientModel.getMaritimeGiveOptions());
	this.view.hideGetOptions();
	this.view.setMessage("Choose the resource you want to give");
};

/**
 * Called by the view when the player "undoes" their get selection
 * @method unsetGetValue
 * @return void
 */
MaritimeController.prototype.unsetGetValue = function(){
	this.resourceToGet = null;
	this.view.enableTradeButton(false);
	this.view.showGetOptions(this.clientModel.gameboard.bank.getAvailableResources());
	this.view.setMessage("Choose the resource you want to receive");
};

/**
 * Called by the view when the player selects which resource to give
 * @method setGiveValue
 * @param{String} resource The resource to trade ("wood","brick","sheep","wheat","ore")
 * @return void
 */
MaritimeController.prototype.setGiveValue = function(resource){
	this.resourceToGive = resource;
	
	this.view.showGetOptions(this.clientModel.gameboard.bank.getAvailableResources());
	
	var ratios = this.clientModel.gameboard.map.getResourceRatios(this.clientModel.getClientPlayer().playerIndex);
	this.tradeRatio = ratios[unCapFirst(resource)];
	this.view.selectGiveOption(resource, this.tradeRatio);

	this.view.setMessage("Choose the resource you want to recieve");
};

/**
 * Called by the view when the player selects which resource to get
 * @method setGetValue
 * @param{String} resource The resource to trade ("wood","brick","sheep","wheat","ore")
 * @return void
 */
MaritimeController.prototype.setGetValue = function(resource){
	this.resourceToGet = resource;
	this.view.selectGetOption(resource, 1);
	this.view.enableTradeButton(true);
	this.view.setMessage("Trade " + this.tradeRatio + " " + this.resourceToGive + " for 1 " + resource);
};

/** Called by the view when the player makes the trade
 * @method makeTrade
 * @return void
 */
MaritimeController.prototype.makeTrade = function(){
	this.clientModel.getClientPlayer().maritimeTrade(this.tradeRatio, capFirst(this.resourceToGive), capFirst(this.resourceToGet));
	this.unsetGetValue()
	this.unsetGiveValue()
	this.view.setMessage("Choose resource to give");
};

function capFirst(str){
	return str[0].toUpperCase() + str.slice(1);
};

function unCapFirst(str){
	return str[0].toLowerCase() + str.slice(1);
};
