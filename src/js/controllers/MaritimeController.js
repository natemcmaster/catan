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
	if(this.clientModel.isMyTurn()) {
		showGiveOptions(this);
		this.view.hideGetOptions();
		this.view.enableTradeButton(false);
		//Call getResourceRatios here
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
	console.log("unsetting give from: " + this.resourceToGive);

	this.resourceToGive = null;
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
	console.log("unsettting get from: " + this.resourceToGet);

	this.resourceToGet = null;
	this.view.enableTradeButton(false);
	showGetOptions(this);
	this.view.setMessage("Choose the resource you want to receive");
};

/**
 * Called by the view when the player selects which resource to give
 * @method setGiveValue
 * @param{String} resource The resource to trade ("wood","brick","sheep","wheat","ore")
 * @return void
 */
MaritimeController.prototype.setGiveValue = function(resource){
	console.log(this.clientModel);
	
	this.resourceToGive = resource;

	showGetOptions(this);
	
	var ratios = getResourceRatios(this);
	this.tradeRatio = ratios[unCapFirst(resource)];
	this.view.selectGiveOption(resource, this.tradeRatio);

	// this.view.showGetOptions();
	this.view.setMessage("Choose the resource you want to recieve");
};

function showGiveOptions(proto){
	var localPlayer = proto.clientModel.getClientPlayer();

	var localPlayerIndex = localPlayer.playerIndex;
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

	proto.view.showGiveOptions(giveOptions);
}


/**
* Assign to each resource the most favorable ratio that the
* player has availble. 2:1 on special ports, 3:1 on generic ports, or 4:1 in worst case
*/
function getResourceRatios(proto){
	
	// Initialize to 4 by default
	var ratios = {
		wood  : 4,
		brick : 4,
		sheep : 4, 
		wheat : 4,
		ore   : 4
	}

	// Get player ports
	var localPlayer = proto.clientModel.getClientPlayer();
	var localPlayerIndex = localPlayer.playerIndex;
	var ports = proto.clientModel.gameboard.map.portsForPlayer(localPlayerIndex);

	// Depending on if a port is generic or 2:1 (special), set ratio
	for(var i=0; i < ports.length; i++){
		var port = ports[i];
		
		if(port.inputResource){
			var resource = unCapFirst(port.inputResource);
			ratios[resource] = port.ratio;
		} else {
			ratios.wood = 3; ratios.brick = 3; ratios.sheep = 3; ratios.wheat = 3; ratios.ore = 3;
		}
	}

	return ratios;
}



/**
* Enables "get" resource buttons from the bank
* only if there are 1 or more of that resource.
*/
function showGetOptions(proto){
	var bank = proto.clientModel.gameboard.bank;

	// Loop through each resource in the bank, enabling
	// trades for resources that have greater than 1 stock
	var getOptions = [];
	for (var getResource in proto.clientModel.gameboard.bank) {
		if (proto.clientModel.gameboard.bank.hasOwnProperty(getResource)) {
			if(proto.clientModel.gameboard.bank[getResource] >= 1){
				getOptions.push(getResource);
			}
		}
	}
	proto.view.showGetOptions(getOptions);
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
	console.log("setting get to: " + resource);
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

