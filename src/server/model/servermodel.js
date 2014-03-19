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
* This the top-level server model class

* @class ServerModel
* @constructor
* @param {integer} playerID The id of the local player, extracted from the cookie
*/
function ServerModel(data, $Log, $Chat, $GameBoard){
  if(!data || !data.log || !data.chat || 'undefined' === typeof data.revision)
    throw new TypeError('invalid data model');

  this.log = $Log(data.log);
  this.chat = $Chat(data.chat);
  this.gameboard = $GameBoard(data);
};

ServerModel.prototype.sendChat = function(playerIndex, message) {

};

ServerModel.prototype.rollNumber = function(playerIndex, number) {

};

ServerModel.prototype.robPlayer = function(playerIndex, victimIndex, location) {

};

ServerModel.prototype.finishTurn = function(playerIndex) {

};

ServerModel.prototype.buyDevCard = function(playerIndex) {

};

ServerModel.prototype.playYearOfPlenty = function(playerIndex, resource1, resource2) {

};

ServerModel.prototype.playRoadBuilding = function(playerIndex, spot1, spot2) {

};

ServerModel.prototype.playSoldier = function(playerIndex, victimIndex, location) {

};

ServerModel.prototype.playMonopoly = function(playerIndex, resource) {

};

ServerModel.prototype.playMonument = function(playerIndex) {

};

ServerModel.prototype.buildRoad = function(playerIndex, roadLocation, free) {

};

ServerModel.prototype.buildSettlement = function(playerIndex, vertexLocation, free) {

};

ServerModel.prototype.buildCity = function(playerIndex, vertexLocation, free) {

};

ServerModel.prototype.offerTrade = function(playerIndex, offer, receiver) {

};

ServerModel.prototype.acceptTrade = function(playerIndex, willAccept) {

};

ServerModel.prototype.maritimeTrade = function(playerIndex, ratio, inputResource, outputResource) {

};

ServerModel.prototype.discardCards = function(playerIndex, cardsToDiscard) {

};
