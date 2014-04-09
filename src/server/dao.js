var _ = require('lodash');
var fs = require('fs'),
	path = require('path');
/**
 * @module catan
 * @namespace catan
 */

module.exports = DAO;

/**
 * @class DAO
 * @constructor
 */
function DAO(deltaNumber, dataPath, $PersistanceLayer, $GameRoom, $GameModel) {
  this.pl = $PersistanceLayer(dataPath);
  this.gr = $GameRoom();
  this.constructGame = $GameModel;
  this.deltaNumber = deltaNumber;
  this.currentDelta = 0;

  var data = JSON.parse(fs.readFileSync(path.join(__dirname,'/_initialdata.json')));
	this.blank = data.blank;
	this.constructGame = $GameModel;

}

/**
 * <pre>
 * Post-Condition: the created game room object has all of the previously
 * persisted data in it
 * </pre>
 * @method createGameRoom
 * @return {GameRoom} the created game room
 */
DAO.prototype.createGameRoom = function (callback) {

	this.pl.readAllUsers(function(error, users){
		this.gr.users = users;
		this.pl.getAllGameInfo(function(error, games){
			this.gr.games = games;
			callback(this.gr)
		}.bind(this));
	}.bind(this));

}

/**
 * <pre>
 * Post-condition: the command is persisted
 * </pre>
 * @method persistCommand
 * @param {object} command
 * @return {int} command id
 */
DAO.prototype.persistCommand = function (gameID, command) {

  this.pl.persistCommand(gameID, command, function(error){});
  if(this.currentDelta >= this.deltaNumber){

  	var gameData;

  	for(i = 0; i < this.gr.games.length; i++){
  		if(this.gr.games[i].id == gameID){
  			gameData = this.gr.games[i];
  			break;
  		}
  	}

  	this.pl.updateGame(gameID, gameData, function(error){

  		this.currentDelta = 0;

  	}.bind(this));
  	

  }



}

/**
 * <pre>
 * Pre-condition: the username is not taken already
 * Post-condition: the user is created
 * </pre>
 * @method createUser
 * @param {str} user
 * @param {str} password
 * @return {int} the userid
 */
DAO.prototype.createUser = function (user, password) {

	this.pl.persistUser(user, password, function(error, userID){

		this.gr.users[userID] = {'id' : userID,
								 'username' : user,
								 'password' : password};

	}.bind(this));
}

/**
 * <pre>
 * Post-condition: the game is created
 * </pre>
 * @method createGame
 * @param {object} gameinfo
 * @return {int} gameId
 */
DAO.prototype.createGame = function (gameinfo) {
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
		id: -1,
		title: title,
		model: model
	};

	this.pl.persistGame(game, function(error, gameID){

		game.id = gameID;
		this.gr.games[game.id] = game;

	}.bind(this));

	
}

/**
 * <pre>
 * Post-condition: the game is updated
 * </pre>
 * @method updateGame
 * @param {int} id
 * @param {object} gameinfo
 * @return {void}
 */
DAO.prototype.updateGame = function (id, gameinfo) {
	this.pl.updateGame(id, gameinfo, function(error){});
}

