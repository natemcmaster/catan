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

var window = window || {};
var catan = window.catan || {};
catan.trade = catan.trade || {};
catan.trade.maritime = catan.trade.maritime || {};

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
	showGiveOptions(this);
	this.view.hideGetOptions();
	this.view.setMessage("Choose resource to trade in.");
	this.view.enableTradeButton(false);

}

function showGiveOptions(proto){
	var localPlayer = proto.clientModel.getClientPlayer();
	var localPlayerID = localPlayer.playerID;
	var ports = proto.clientModel.gameboard.map.portsForPlayer(localPlayerID);
	console.log(ports);

	var giveOptions = [];
	for(var i=0; i < ports.length; i++){
		var port = ports[i];
		
		// If port.inputResource exsits, then the port ratio is 2:1
		if(port.inputResource){
			if(localPlayer.resources[unCapFirst(port.inputResource)] >= port.ratio){
				giveOptions.push(unCapFirst(port.inputResource));
			}	
		}
		//Otherwise, the ratio is 3:1
		else {
			// Loop through each of the resources that a player owns
			for (var resource in localPlayer.resources) {
			  if (localPlayer.resources.hasOwnProperty(resource)) {
			    if(localPlayer.resources[resource] >= 3){
			    	giveOptions.push(resource);
			    }
			  }
			}

		}
	}

	proto.view.showGiveOptions(giveOptions);
}


/**
 * Called by the view when the player "undoes" their give selection
 * @method unsetGiveValue
 * @return void
 */
MaritimeController.prototype.unsetGiveValue = function(){
	console.log("unsetting give from: " + this.resourceToGive);

	this.resourceToGive = null;	
};

/**
 * Called by the view when the player "undoes" their get selection
 * @method unsetGetValue
 * @return void
 */
MaritimeController.prototype.unsetGetValue = function(){
	console.log("unsettting get from: " + this.resourceToGet);

	this.resourceToGet = null;
};

/**
 * Called by the view when the player selects which resource to give
 * @method setGiveValue
 * @param{String} resource The resource to trade ("wood","brick","sheep","wheat","ore")
 * @return void
 */
MaritimeController.prototype.setGiveValue = function(resource){
	console.log(this.clientModel);
	
	// Loop through each resource in the bank, enabling
	// trades for resources that have greater than 1 stock
	var getOptions = [];
	for (var resource in this.clientModel.gameboard.bank) {
	  if (this.clientModel.gameboard.bank.hasOwnProperty(resource)) {
	    if(this.clientModel.gameboard.bank[resource] >= 1){
	    	getOptions.push(resource);
	    }
	  }
	}
	this.view.showGetOptions(getOptions);

	this.resourceToGive = resource;
	this.view.selectGiveOption(resource, 2);
	this.view.showGetOptions();
	console.log("setting give type to: " + resource);
};

/**
 * Called by the view when the player selects which resource to get
 * @method setGetValue
 * @param{String} resource The resource to trade ("wood","brick","sheep","wheat","ore")
 * @return void
 */
MaritimeController.prototype.setGetValue = function(resource){
	this.resourceToGet = resource;
	this.view.selectGetOption(resource, 2);
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
MaritimeController.prototype.makeTrade= function(){
	/*
	return {
		"type": "maritimeTrade",
		"playerIndex": this.playerID,
		"ratio": this.ratio,
		"inputResource": this.inputResource,
		"outputResource": this.outputResource
	}
	(playerID, ratio, inputResource, outputResource)
	*/
	var localPlayerID = this.clientModel.getClientPlayer().playerID;


	//TODO: find correct ratio
	this.clientModel.proxy.executeCommand(new MaritimeTradeCommand(localPlayerID, 2, this.resourceToGive, this.resourceToGet));	
}

