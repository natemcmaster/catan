module.exports = MemoryGameRepo;
var CatanError = require('../../../common/Errors').CatanError;
var _ = require('lodash');
var fs = require('fs'),
	path = require('path');

function MemoryGameRepo($GameModel) {
	var data = JSON.parse(fs.readFileSync(path.join(__dirname,'/_initialdata.json')));
	this.blank = data.blank;
	this.constructGame = $GameModel;
	this.games = {};
	this.games[0] = {
		id: 0,
		title: 'New game (Sorry Spencer)',
		model: $GameModel(data.sample)
	};
	this.games[1] = {
		id: 1,
		title: 'Populated Game',
		model: $GameModel(data.populated_sample)
	};
	this.games[2] = {
		id: 2,
		title: 'Ongoing game',
		model: $GameModel(data.booyah)
	};
	this.nextId = 3;
}

MemoryGameRepo.prototype.create = function(title, randomTiles, randomNumber, randomPorts) {
	var blank = _.cloneDeep(this.blank);
	if(randomTiles){
		var types = _.shuffle(['Desert', 'Wood', 'Wood', 'Wood', 'Wood', 'Ore', 'Ore', 'Ore', 'Sheep', 'Sheep', 'Sheep', 'Sheep', 'Wheat', 'Wheat', 'Wheat', 'Wheat', 'Brick', 'Brick', 'Brick']);
		var newDesertLocation, prevDesertLocation;
		blank.map.hexGrid.hexes = _(blank.map.hexGrid.hexes).map(function(s) {
			return _(s).map(function(t) {
				if (!t.isLand)
					return t;
				if (!t.landtype) {
					prevDesertLocation = t.location;
				}
				var nexttype = types.pop();
				t.landtype = (nexttype == 'Desert') ? null : nexttype;
				if (!t.landtype) {
					newDesertLocation = t.location;
				}
				return t;
			}).value();
		}).value();

		// make sure the number is not on the desert tile
		_(blank.map.numbers).forIn(function(v,k,o) {
			o[k]=_(v).map(function(t) {
				if (t.x == newDesertLocation.x && t.y == newDesertLocation.y) {
					return prevDesertLocation;
				}
				return t;
			}).value();
		});

	}
	if(randomPorts){
		var types=_.shuffle(['Any','Any','Any','Any','Wood','Brick','Ore','Sheep','Wheat']);
		_(blank.map.ports).forIn(function(v,k,o){
			var nexttype = types.shift();
			if(nexttype == 'Any'){
				o[k].inputResource = undefined;
				o[k].ratio = 3;
			} else{
				o[k].inputResource = nexttype;
				o[k].ratio = 2;
			}
		});
	}
	if(randomNumber){
		var places = _.chain(blank.map.numbers).reduce(function(a,b){
			return a.concat(b);
		},[])
		.shuffle()
		.value();
		_(blank.map.numbers).forIn(function(v,k,o){
			var p = [places.shift()];
			if(k!=2 && k!=12){
				p.push(places.shift());
			}
			o[k]=p;
		});
	}

	var model = this.constructGame(blank);
	var game = {
		id: (this.nextId++),
		title: title,
		model: model
	};
	this.games[game.id] = game;
	return game;
}

MemoryGameRepo.prototype.update = function(key, game, property) {
	if (!this.games[key])
		throw new CatanError('Game does not exist');
	this.games[key] = game;
	return true;
};

MemoryGameRepo.prototype.read = function(key) {
	return this.games[key];
}

MemoryGameRepo.prototype.delete = function(key) {
	delete this.games[key];
	return true;
}

MemoryGameRepo.prototype.getAll = function() {
	return _.toArray(this.games);
}
