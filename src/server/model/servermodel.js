var GameBoard = require("./board/GameBoard");
var Chat = require("./Chat");
var Log = require("./Log");
var Proxy = require("./Proxy");

var Definitions = require('byu-catan').definitions;
var ResourceTypes = Definitions.ResourceTypes;

module.exports = ServerModel;

/**
  This module contains the top-level server model class
  
  @module   catan.server.model
  @namespace servermodel
*/

if (typeof(catan) === 'undefined') catan = {}
catan.models = catan.models || {};

catan.models.ServerModel = ServerModel
/** 
* This the top-level server model class that contains the local player, map contents, etc.

* @class ServerModel
* @constructor
* @param {integer} playerID The id of the local player, extracted from the cookie
*/
function ServerModel(playerID){
  this.playerID = playerID;
  this.observers=[];
  this.revision = -1;
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
    try{
      this.populateModels(data); 
    }
    catch(e){
      console.error(e);
      return;
    }
    
    success();

  }.bind(this));

  this.proxy.startPolling();
}

/**
 * Updates the models if the revision number has changed.
 * @param  {object} data Raw data from server
 * @return {void}      
 */
ClientModel.prototype.populateModels = function (data) {
  if(!data || !data.log || !data.chat || 'undefined' === typeof data.revision)
    throw new TypeError('invalid data model');

  if(this.revision === data.revision){
      return;
  }
  this.revision = data.revision;
  this.log = new Log(this.proxy, data.log);
  this.chat = new Chat(this.proxy, data.chat);
  try{
    this.gameboard = new GameBoard(this.proxy, data);
  }
  catch(e){
    throw new TypeError('invalid gameboard model');
  }
  for (var x in data.players) {
    if (data.players[x].playerID == this.playerID) {
      this.playerIndex = +x;
      break;
    }
  }
  this.notifyObservers();
}


