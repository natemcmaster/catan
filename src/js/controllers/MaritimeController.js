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
var MaritimeTradeCommand = require('../model/commands/MaritimeTradeCommand');
var Map = require('../model/board/map/Map');

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
* Freaking hacked together onUpdate since the constructor wouldn't work.
*
*
*								*SIGH*
*
*       
*/
MaritimeController.prototype.onUpdate = function(){
	if(this.clientModel.isMyTurn() && this.clientModel.getCurrentStatus() == "Playing") {
		showGiveOptions(this);
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
}


/**
 * Called by the view when the player "undoes" their give selection
 * @method unsetGiveValue
 * @return void
 */
MaritimeController.prototype.unsetGiveValue = function(){
	this.resourceToGive = null;
	this.view.enableTradeButton(false);
	showGiveOptions(this);
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
	
	var ratios = Map.getResourceRatios(this.clientModel.getClientPlayer().playerIndex);y
	this.tradeRatio = ratios[unCapFirst(resource)];
	this.view.selectGiveOption(resource, this.tradeRatio);

	this.view.setMessage("Choose the resource you want to recieve");
};

function showGiveOptions(proto){
	var localPlayer = proto.clientModel.getClientPlayer();

	var localPlayerIndex = localPlayer.playerIndex;
	var ratios = Map.getResourceRatios(localPlayerIndex);
	var giveOptions = this.clientModel.getClientPlayer().getMaritimeGiveOptions(ratios);
	proto.view.showGiveOptions(giveOptions);


	/*
	var ports = proto.clientModel.gameboard.map.portsForPlayer(localPlayerIndex);
	console.log(ports);

	var giveOptions = []
	  , resource;
	for(var i=0; i < ports.length; i++){
		var port = ports[i];

		// If port.inputResource exsits, then the port ratio is 2:1
		if(port.inputResource){
			if(localPlayer.resources[unCapFirst(port.inputResource)] >= port.ratio){
				giveOptions.push(unCapFirst(port.inputResource));
			}	
		//Otherwise, the ratio is 3:1
		} else {
			// Loop through each of the resources that a player owns
			for (resource in localPlayer.resources) {
				if (giveOptions.indexOf(resource) !== -1) continue;
				if (localPlayer.resources.hasOwnProperty(resource)) {
					if(localPlayer.resources[resource] >= 3){
						giveOptions.push(resource);
					}
				}
			}
		}
	}

	for (resource in localPlayer.resources) {
		if (giveOptions.indexOf(resource) !== -1) continue;
		if (localPlayer.resources.hasOwnProperty(resource)) {
			if(localPlayer.resources[resource] >= 4){
				giveOptions.push(resource);
			}
		}
	}

	proto.view.showGiveOptions(giveOptions); */
}

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


function capFirst(str){
	return str[0].toUpperCase() + str.slice(1);
}

function unCapFirst(str){
	return str[0].toLowerCase() + str.slice(1);
}

/** Called by the view when the player makes the trade
 * @method makeTrade
 * @return void
 */
MaritimeController.prototype.makeTrade = function(){
	this.clientModel.getClientPlayer().maritimeTrade(this.tradeRatio, capFirst(this.resourceToGive), capFirst(this.resourceToGet));
	this.unsetGetValue()
	this.unsetGiveValue()
	this.view.setMessage("Choose resource to give");
}
