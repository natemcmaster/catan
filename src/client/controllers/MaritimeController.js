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
	
	this.ratios = null;
	this.giveOptions = null;
	this.getOptions = null;
	this.tradeRatio = null;
	this.resourceToGive = null;
	this.resourceToGet = null;
};

MaritimeController.prototype = core.inherit(Controller.prototype);

/**
* Called by the client model every time the model changes.
* Overrides onUpdate in BaseController
* @method onUpdate
* @return void
*/
MaritimeController.prototype.onUpdate = function(){
	if(this.clientModel.isMyTurn() && this.clientModel.getCurrentStatus() == "Playing") {
		this.ratios = this.clientModel.getMaritimeResourceRatios();
		this.giveOptions = this.clientModel.getMaritimeGiveOptions(this.ratios);
		this.getOptions = this.clientModel.getMaritimeGetOptions();

		this.view.showGiveOptions(this.giveOptions);
		this.view.hideGetOptions();
		this.view.enableTradeButton(false);
		this.view.setMessage("Choose the resource you want to give");
	}
	else {
		this.view.hideGiveOptions();
		this.view.hideGetOptions();
		this.view.enableTradeButton(false);
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
	this.resourceToGet = null;
	this.tradeRatio = null;
	
	this.view.hideGetOptions();
	this.view.showGiveOptions(this.giveOptions);
	this.view.enableTradeButton(false);
	this.view.setMessage("Choose the resource you want to give");
};

/**
 * Called by the view when the player "undoes" their get selection
 * @method unsetGetValue
 * @return void
 */
MaritimeController.prototype.unsetGetValue = function(){
	this.resourceToGet = null;
	this.view.showGetOptions(this.getOptions);
	this.view.enableTradeButton(false);
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
	this.tradeRatio = this.ratios[resource];
	
	this.view.selectGiveOption(resource, this.tradeRatio);
	this.view.showGetOptions(this.getOptions);
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
	this.clientModel.getClientPlayer().maritimeTrade(this.tradeRatio, this.resourceToGive, this.resourceToGet);

	this.unsetGetValue();
	this.unsetGiveValue();
	this.view.enableTradeButton(false);
	this.view.setMessage("Choose resource to give");
};
