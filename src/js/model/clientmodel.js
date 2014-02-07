
var GameBoard = require("./board/GameBoard");
var Chat = require("./Chat");
var Log = require("./Log");
var Proxy = require("./Proxy");

/**
	This module contains the top-level client model class
	
	@module		catan.models
	@namespace models
*/

var catan = catan || {};
catan.models = catan.models || {};
	
catan.models.ClientModel  = (function clientModelNameSpace(){
	/** 
	 * This the top-level client model class that contains the local player, map contents, etc.

	 * @class ClientModel
	 * @constructor
	 * @param {integer} playerID The id of the local player, extracted from the cookie
	  */
	var ClientModel = (function ClientModelClass(){

		function ClientModel(playerID){
			this.playerID = playerID;
		}      

		/**
		 * This is called to fetch the game state from the server the very first time.
		 * It should: 1) fetch the game state JSON from the server, 2) update the client model with the
		 * returned data, 3) notify all client model listeners that the model has changed, and 4) invoke
		 * the success callback function with the object received from the server.
		 * 
		 * @method initFromServer
		 * @param {function} success - A callback function that is called after the game state has been fetched from the server and the client model updated. This function is passed a single parameter which is the game state object received from the server.
		 */
		ClientModel.prototype.initFromServer = function(success){
			this.proxy = new Proxy(this.populateModels.bind(this));
			this.proxy.getModel(function(err, data){
				success();
				this.populateModels(data);
			}.bind(this));

			this.proxy.startPolling();
			// TODO: 1) fetch the game state from the server, 2) update the client model, 3) call the "success" function.
		}

		// 
		ClientModel.prototype.populateModels = function (data) {

			this.log = new Log(this.proxy, data.log);
			this.chat = new Chat(this.proxy, data.chat);
			this.gameboard = new GameBoard(this.proxy, data.bank, data.biggestArmy, data.deck, data.longestRoad, data.map, data.players, data.turnTracker, data.winner);
		}

		return ClientModel;
	}());	

	return ClientModel;
}());

module.exports = catan.models.ClientModel;

