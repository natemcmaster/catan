







function Bank(data){

	var bank = data.bank || {'brick' : 19,
							 'wood' : 19,
					         'sheep' : 19,
							 'wheat' : 19,
							 'ore' : 19};

	this.brick = bank.brick;
	this.wood = bank.wood;
	this.sheep = bank.sheep;
	this.wheat = bank.wheat;
	this.ore = bank.ore;


};

Bank.prototype.withdraw = function(resource, amount){
	var a = amount || 1
	this[resource] -= a
};

Bank.prototype.deposit = function(resource, amount){
	var a = amout || 1
	this[resource] += a

};

Bank.prototype.toJSON = function(){

	return {'brick' : this.brick,
			'wood' : this.wood,
			'sheep' : this.sheep,
			'wheat' : this.wheat,
			'ore' : this.ore};

};