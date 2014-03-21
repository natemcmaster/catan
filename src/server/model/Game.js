var BaseModel = require('./BaseModel');
var util = require('util');

module.exports = Game;
util.inherits(Game, BaseModel);

/** 
* This is the server model class

* @class Game
* @constructor
* @param {data} playerID The id of the local player, extracted from the cookie
*/
function Game(data, $Log, $Chat, $GameBoard){
  if(!data)
    throw new TypeError('invalid data model');

  this.log = $Log(data.log);
  this.chat = $Chat(data.chat);
  this.gameboard = $GameBoard(data);
};

Game.prototype.sendChat = function(playerIndex, message) {

};

Game.prototype.rollNumber = function(playerIndex, number) {

};

Game.prototype.robPlayer = function(playerIndex, victimIndex, location) {

};

Game.prototype.finishTurn = function(playerIndex) {

};

Game.prototype.buyDevCard = function(playerIndex) {

};

Game.prototype.playYearOfPlenty = function(playerIndex, resource1, resource2) {

};

Game.prototype.playRoadBuilding = function(playerIndex, spot1, spot2) {

};

Game.prototype.playSoldier = function(playerIndex, victimIndex, location) {

};

Game.prototype.playMonopoly = function(playerIndex, resource) {

};

Game.prototype.playMonument = function(playerIndex) {

};

Game.prototype.buildRoad = function(playerIndex, roadLocation, free) {

};

Game.prototype.buildSettlement = function(playerIndex, vertexLocation, free) {

};

Game.prototype.buildCity = function(playerIndex, vertexLocation, free) {

};

Game.prototype.offerTrade = function(playerIndex, offer, receiver) {

};

Game.prototype.acceptTrade = function(playerIndex, willAccept) {

};

Game.prototype.maritimeTrade = function(playerIndex, ratio, inputResource, outputResource) {

};

Game.prototype.discardCards = function(playerIndex, cardsToDiscard) {

};
