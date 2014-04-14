var _ = require('lodash');
var fs = require('fs'),
	path = require('path'),
	Sync = require('node-sync');
/**
 * @module catan
 * @namespace catan
 */

module.exports = DAO;

/**
 * @class DAO
 * @constructor
 */
function DAO(maxDelta, dataPath, $PersistanceLayer, $GameModel, $AbstractMoveCommand) {
	this.pl = $PersistanceLayer(dataPath);
	this.abstactCommand = $AbstractMoveCommand;
	this.constructGame = $GameModel;
	var data = JSON.parse(fs.readFileSync(path.join(__dirname, 'initial_data', '_initialdata.json')));
	this.blank = data.blank;

	var gamesDeltas = {};
	this.updateDelta = function(gameId) {
		if (!gameDeltas[gameId]) { //intentionally tricky: this is true for new games and games that have reached zero deltas
			gameDeltas[gameId] = maxDelta;
			return true;
		}
		gameDeltas[gameId] -= 1;
		return false;
	}
}

DAO.prototype.getUsers = function(callback){
	this.pl.readAllUsers(callback);
}


DAO.prototype.getGames = function(callback){
	Sync(function(){
		var data = this.pl.getAllGameInfo.sync();
		var games = [];
		for (var i = data.length - 1; i >= 0; i--) {
			var game = this.constructGame(data[i].current);
			var commands = this.pl.getRecentGameCommands.sync(null,game.id,data.last_command_id);
			for(var j = 0; j < commands.length; j++){
				var data = command[j].data;
				var command= this.abstactCommand.fromJSON(data);
				this.constructCommands.replayOnGame(game);
			}
			games.push(game);
		}

		callback(null,games);
	})
}

/**
 * <pre>
 * Post-condition: the command is persisted
 * </pre>
 * @method saveCommand
 * @param {object} command
 * @param {fn(err, commandID)} callback
 * @return {void}
 */
DAO.prototype.saveCommand = function(command, game, doneSaving) {
	var data=command.toJSON();
	this.pl.persistCommand(game.id, data, function(error, commandId) {
		if (error) {
			doneSaving(error);
			return;
		}

		if (this.updateDelta(gameId)) {
			this.pl.updateGame(game.id, commandId, game, function(err) {
				doneSaving(err);
			});
		} else {
			doneSaving(null);
		}
	}.bind(this));
}

/**
 * <pre>
 * Pre-condition: the username is not taken already
 * Post-condition: the user is created
 * </pre>
 * @method createUser
 * @param {str} user
 * @param {str} password
 * @param {fn(err, userData} done
 * @return {void}
 */
DAO.prototype.createUser = function(user, password, done) {
	this.pl.persistUser(user, password, function(error, userID) {
		if (error) {
			return done(error);
		}
		var u = {
			'id': userID,
			'username': user,
			'password': password
		};
		done(null, u);
	});
}

function randomTilify(game) {
	var types = _.shuffle(['Desert', 'Wood', 'Wood', 'Wood', 'Wood', 'Ore', 'Ore', 'Ore', 'Sheep', 'Sheep', 'Sheep', 'Sheep', 'Wheat', 'Wheat', 'Wheat', 'Wheat', 'Brick', 'Brick', 'Brick']);
	var newDesertLocation, prevDesertLocation;
	game.map.hexGrid.hexes = _(game.map.hexGrid.hexes).map(function(s) {
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
	_(game.map.numbers).forIn(function(v, k, o) {
		o[k] = _(v).map(function(t) {
			if (t.x == newDesertLocation.x && t.y == newDesertLocation.y) {
				return prevDesertLocation;
			}
			return t;
		}).value();
	});
}

/**
 * <pre>
 * Post-condition: the game is created
 * </pre>
 * @method createGame
 * @param {object} gameinfo
 * @param {fn(err, game)} callback
 * @return {void}
 */
DAO.prototype.createGame = function(title, randomTiles, randomNumbers, randomPorts, done) {
	var blank = _.cloneDeep(this.blank);
	if (randomTiles) {
		randomTilify(blank)
	}
	if (randomPorts) {
		var types = _.shuffle(['Any', 'Any', 'Any', 'Any', 'Wood', 'Brick', 'Ore', 'Sheep', 'Wheat']);
		_(blank.map.ports).forIn(function(v, k, o) {
			var nexttype = types.shift();
			if (nexttype == 'Any') {
				o[k].inputResource = undefined;
				o[k].ratio = 3;
			} else {
				o[k].inputResource = nexttype;
				o[k].ratio = 2;
			}
		});
	}
	if (randomNumber) {
		var places = _.chain(blank.map.numbers).reduce(function(a, b) {
			return a.concat(b);
		}, [])
			.shuffle()
			.value();
		_(blank.map.numbers).forIn(function(v, k, o) {
			var p = [places.shift()];
			if (k != 2 && k != 12) {
				p.push(places.shift());
			}
			o[k] = p;
		});
	}

	var model = this.constructGame(blank);
	var game = {
		id: -1,
		title: title,
		model: model
	};

	this.pl.persistGame(game, function(error, gameID) {
		if (error) {
			return done(error);
		}
		game.id = gameID;
		this.updateDelta(gameID);
		done(null, game)
	}.bind(this));
}