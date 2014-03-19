



function GameBoard(data, $Bank, $Deck, $Map, $Player, $TurnTracker){


	this.data = data || {'biggestArmy' : -1,
						 'longestRoad' : -1,
						 'winner' : -1,
						 'revision' : 0};

	
	this.bank = $Bank(this.data);
	this.deck = $Deck(this.data);
	this.map = $Map(this.data); //double check this call with Alan
	this.turnTracker = $TurnTracker(this.data);

	this.biggestArmyOwner = this.data.biggestArmy;
	this.mostRoadsOwner = this.data.longestRoad;

	this.players = [];
	for(var i = 0; i < 4; i++){
		this.players.push($Player(this.data, i));
	}

	this.winner = this.data.winner;

	//Trade Offer????
};


GameBoard.prototype.buyDevCard = function(playerIndex){

	this.players[playerIndex].buyDevCard(this.deck.drawRandomCard());
}

GameBoard.prototype.playYearOfPlenty = function(playerIndex, resource1, resource2){

	this.bank.withdraw(resource1);
	this.bank.withdraw(resource2);

	players[playerIndex].playYearOfPlenty(resource1, resource2);
}




