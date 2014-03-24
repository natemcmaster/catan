var BaseModel = require('./BaseModel');
var util = require('util');
var CatanError = require('../../common').Errors.CatanError;
var _ = require('underscore');
var debug = require('debug')('catan:model:game');

module.exports = GameModel;
util.inherits(GameModel, BaseModel);

/**
 * This is the server model class

 * @class GameModel
 * @constructor
 * @param {data} playerID The id of the local player, extracted from the cookie
 */
function GameModel(data, $Log, $Chat, $Bank, $Deck, $Map, $Player, $TurnTracker) {

	if(!data)
		throw new CatanError('Cannot instantiate without data');

	this.data = data;
    this.data.revision = 1;

	this.bank = $Bank(data.bank);
	this.deck = $Deck(data.deck);
	this.map = $Map(data.map);
	this.log = $Log(data.log);
	this.chat = $Chat(data.chat);
	this.turnTracker = $TurnTracker(data.turnTracker);

	this.players = [];
	this.data.players.forEach(function(p,i){
		this.players.push($Player(p, i));
	}.bind(this));

	this.playerConstruct = $Player;
}

GameModel.prototype.toJSON = function () {
  return {
    chat: this.chat.toJSON(),
    bank: this.bank.toJSON(),
    deck: this.deck.toJSON(),
    map: this.map.toJSON(),
    log: this.log.toJSON(),
    turnTracker: this.turnTracker.toJSON(),
    players: this.players.map(function (player) {
      return player.toJSON()
    }),
    longestRoad: this.data.longestRoad,
    biggestArmy: this.data.biggestArmy,
    winner: this.data.winner,
    revision: this.data.revision
  }
}

GameModel.prototype.sendChat = function (playerIndex, message) {
  var playerName = this.players[playerIndex].name;
  this.chat.sendChat(playerName, message);
};

GameModel.prototype.updateColor = function(playerID, color) {
	var p = _(this.players).find(function(s) {
		return s.playerID == playerID
	});
	if (!p) return false;
	p.color = color;
	return true;
}

GameModel.prototype.addPlayer = function(playerID,username,color) {
	var p = this.playerConstruct({
		name: username,
		color: color,
		playerID: playerID
	}, this.players.length);
	this.players.push(p);
	return p;
}

GameModel.prototype.rollDice = function(playerIndex, number) {

  if (number === 7) {
    //This checks to see if anyone needs to discard cards and sets the status on
    //the turnTracker appropriatly
    this.players.forEach(function(player){
      if(player.totalResources() > 7){
        this.turnTracker.setStatus("Discarding");
        return;
      }
    });

    return this.turnTracker.setStatus("Robbing");
  }

  var cards = this.map.getCardsRolled(number)
    , withdrew
    , player

  for (var pIndex in cards) {
    player = this.players[pIndex]
    for (var resource in cards[pIndex]) {
      resource = resource.toLowerCase()
      withdrew = this.bank.withdrawAsMuchAsYouCan(resource, cards[pIndex][resource]);
      player.addResource(resource, withdrew);
    }
  }

  this.turnTracker.setStatus("Playing");
};

GameModel.prototype.robPlayer = function(playerIndex, victimIndex, location) {
	//TurnTracker
	//Players
	//Map
};

GameModel.prototype.getPlayerIndexByID = function(playerID){

	for(var i =0; i < this.players.length; i++){
		if(this.players[i].playerID == playerID){
			return i;
		}
	}
	throw new Error("BAD PLAYER ID");
};

GameModel.prototype.finishTurn = function(playerIndex) {
	this.turnTracker.finishTurn();
	this.players[playerIndex].finishTurn();
	//Resources at the end of setup?
};

GameModel.prototype.buyDevCard = function(playerIndex) {
	var card = this.deck.drawRandomCard();
	this.players[playerIndex].buyDevCard(card);
	this.bank.receivePaymentForDevCard();
};

GameModel.prototype.playYearOfPlenty = function(playerIndex, resource1, resource2) {
	this.bank.withdraw(resource1);
	this.bank.withdraw(resource2);

	players[playerIndex].playYearOfPlenty(resource1, resource2);
};

GameModel.prototype.playRoadBuilding = function(playerIndex, spot1, spot2) {
	this.players[playerIndex].playRoadBuilding();
	
	this.map.placeRoad(playerIndex, spot1);
	this.map.placeRoad(playerIndex, spot2);

	this.recalculateLongestRoad(playerIndex);

	//Check if the player who built has won
	if (this.players[playerIndex].hasWon())
		this.data.winner = playerIndex;

};

GameModel.prototype.playSoldier = function(playerIndex, victimIndex, location) {
	var stolenCard = this.players[victimIndex].loseCard();
	this.players[playerIndex].playSoldier(stolenCard);

	var playerWithLargestArmy = this.data.biggestArmy;

	//If no one has the longest road and the player who just built has 5 or more roads,
	//that player claims the longest road
	if (playerWithLargestArmy == -1 && this.players[playerIndex].getSizeOfArmy() >= 3) {
		this.data.biggestArmy = playerIndex;
		this.players[playerIndex].setLargestArmy(true);
	}

	//If the player who built did not have the longest road, but has now beaten the current
	//owner of the longest road, that player now claims the longest road
	else if (playerIndex != playerWithLargestArmy &&
			this.players[playerIndex].getSizeOfArmy() > this.players[playerWithLargestArmy].getSizeOfArmy()) {
		this.data.biggestArmy = playerIndex;
		this.players[playerWithLargestArmy].setLargestArmy(false);
		this.players[playerIndex].setLargestArmy(true);
	}

	//Check if the player who built has won
	if (this.players[playerIndex].hasWon())
		this.data.winner = playerIndex;

	//STILL NEED TO CHANGE THE MAP
};

GameModel.prototype.playMonopoly = function(playerIndex, resource) {
	var totalNumberOfResource = 0;

	this.players.forEach(function(player) {
		totalNumberOfResource += player.getResource(resource);
		player.setResource(resource, 0);
	});

	this.players[playerIndex].playMonopoly(resource, totalNumberOfResource);
};

GameModel.prototype.playMonument = function(playerIndex) {
	this.players[playerIndex].playMonument();

	if (this.players[playerIndex].hasWon())
		this.data.winner = playerIndex;
};

GameModel.prototype.recalculateLongestRoad = function (playerIndex) {
	var playerWithLongestRoad = this.data.longestRoad;
  if (this.players[playerIndex].getNumberOfRoadsBuilt() < 5) return;
  if (playerWithLongestRoad === playerIndex) return;

	//If no one has the longest road and the player who just built has 5 or more roads,
	//that player claims the longest road
	if (playerWithLongestRoad == -1) {
		this.data.longestRoad = playerIndex;
		this.players[playerIndex].setLongestRoad(true);
    return
	}

	//If the player who built did not have the longest road, but has now beaten the current
	//owner of the longest road, that player now claims the longest road
  var myRoads = this.players[playerIndex].getNumberOfRoadsBuilt();
  var yourRoads = this.players[playerWithLongestRoad].getNumberOfRoadsBuilt();
	if (myRoads > yourRoads) {
		this.data.longestRoad = playerIndex;
		this.players[playerWithLongestRoad].setLongestRoad(false);
		this.players[playerIndex].setLongestRoad(true);
	}
}

GameModel.prototype.buildRoad = function(playerIndex, roadLocation, free) {
	if (!free)
		this.bank.receivePaymentForCity();

	this.players[playerIndex].buildRoad(free);
  this.recalculateLongestRoad(playerIndex);

	//Check if the player who built has won
	if (this.players[playerIndex].hasWon())
		this.data.winner = playerIndex;

  this.map.placeRoad(playerIndex, roadLocation);
};

GameModel.prototype.buildSettlement = function(playerIndex, vertexLocation, free) {
	if (!free)
		this.bank.receivePaymentForSettlement();

	this.players[playerIndex].buildSettlement(free);
	//Check if the player who built has won
	if (this.players[playerIndex].hasWon())
		this.data.winner = playerIndex;

  this.map.placeSettlement(playerIndex, vertexLocation);
};

GameModel.prototype.buildCity = function(playerIndex, vertexLocation, free) {
	if (!free)
		this.bank.receivePaymentForCity();

	this.players[playerIndex].buildCity(free);

	//Check if the player who built has won
	if (this.players[playerIndex].hasWon())
		this.data.winner = playerIndex;

  this.map.placeCity(playerIndex, vertexLocation);
};

GameModel.prototype.offerTrade = function(playerIndex, offer, receiver) {
	this.data.tradeOffer = {
		sender: playerIndex,
		receiver: receiver,
		offer: offer
	};
};

GameModel.prototype.acceptTrade = function(playerIndex, willAccept) {
	if (!willAccept) {
    delete this.data.tradeOffer;
    return;
  }

	this.players[this.data.tradeOffer.sender].acceptTrade(this.data.tradeOffer.offer, true);
	this.players[this.data.tradeOffer.receiver].acceptTrade(this.data.tradeOffer.offer, false);
};

GameModel.prototype.maritimeTrade = function(playerIndex, ratio, inputResource, outputResource) {
  debug('maritime', playerIndex, ratio);
	this.players[playerIndex].maritimeTrade(inputResource, ratio, outputResource);
	this.bank.deposit(inputResource, ratio);
	this.bank.withdraw(outputResource, 1);
};

GameModel.prototype.discardCards = function(playerIndex, cardsToDiscard) {
	this.players[playerIndex].discardCards(cardsToDiscard);
	this.bank.depositResources(cardsToDiscard);

	var changeStatus = true;

	this.players.forEach(function(player) {
		if (!player.hasDiscarded())
			changeStatus = false;
	});

	if (changeStatus)
		this.turnTracker.setStatus('Playing');
};
