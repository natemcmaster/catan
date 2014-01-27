/**
 * GameRoom manages creating users and games, and allowing users to join or create a game.
 * @module catan.model
 * @namespace model
 */

module.exports=GameRoom;

var proxy=require('./Proxy');

/**
 * <pre>
 * Invariant: NONE
 * </pre>
 * GameRoom manages creating users and games, and allowing users to join or create a game.
 * @class GameRoom
 * @param {model.Proxy} proxy Reference to proxy
 */
function GameRoom(proxy){

}

// read-only functions

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * Gets a list of all games on the server
 * @method getAllGames
 * @return {Array} An array of all games and their descriptions
 */
GameRoom.prototype.getAllGames=function(){};

/**
 * <pre>
 * Pre-condition:NONE
 * Post-condition:NONE
 * </pre>
 * Lists all types of automatic players
 * @method listAi
 * @return {Array} List of the names of all types of AI
 */
GameRoom.prototype.listAi=function(){
	// TODO: should this be async? Or should we just get it @ the start and
	// cache it? b/c it's not going to change.
};


// modification functions

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: If the credentials are correct, the user is logged in (async!)
 * </pre>
 * Check if user can login
 * @method login
 * @param  {string} username case-sensitive username
 * @param  {string} password case-sensitive password
 * @param {function} cb Callback function. cb(success, error)
 * @return {void}
 */
GameRoom.prototype.login=function(username,password,cb){

};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: If the username is unique and the password is non-empty, a
 * new user is created.
 * </pre>
 * First checks if username is unique and password is non-empty. If so, it creates a user.
 * @method register
 * @param  {string} username Requested username
 * @param  {string} password Register with password
 * @param {function} cb Callback function. cb(success, error)
 * @return {void}
 */
GameRoom.prototype.register=function(username,password,cb){

};

/**
 * <pre>
 * Pre-condition: Username is valid, gameId is valid. Game has open spots
 * Post-condition: User is added to the game roster. (async!)
 * </pre>
 * Joins a user to a game
 * @method joinGame
 * @param {string} username Username
 * @param {int} gameId ID corresponding to a game
 * @param {function} callback Callback function (success?, error)
 * @return {void}
 */
GameRoom.prototype.joinGame=function(username,gameId,callback){

};

/**
 * <pre>
 * Pre-condition: gameName is non-empty and unique
 * Post-condition: New, empty game is created (async!)
 * </pre>
 * Creates a new game
 * @method createGame
 * @param  {string} gameName Name of the game
 * @param  {function} callback Callback function cb(success?, error)
 * @return {void}
 */	
GameRoom.prototype.createGame=function(gameName, callback){

};

/**
 * <pre>
 * Pre-condition: aiType is a valid AI name. Game has open spots.
 * Post-condition: An AI player is added to the game roster (async!)
 * </pre>
 * Adds an AI player to the game
 * @method addAi
 * @param {string} aiType Name of an ai type. See GameRoom.listAi()
 * @param {int} gameId ID of the game
 * @param {function} cb Callback function cb(success?, error)
 * @return {void}
 */
GameRoom.prototype.addAi=function(aiType,gameId,cb){

};
