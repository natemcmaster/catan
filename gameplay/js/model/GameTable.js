/**
 * @module catan.model
 * @namespace model
 */

module.exports=GameTable;

/**
 * <pre>
 * Invariant: NONE
 * </pre>
 * GameTable manages all data used by the web-interface.
 * @class GameTable
 * @param {model.Proxy} proxy A reference to the HTTP proxy used
 */
function GameTable(proxy){

}

/**
 * The game log
 * @property log
 * @type {model.Log}
 */
var log=require('./Log');

/**
 * The game chat
 * @property chat
 * @type {model.Chat}
 */
var chat=require('./Chat');

/**
 * The game board
 * @property gameBoard
 * @type {model.Chat}
 */
var gameBoard=require('./board/GameBoard');


/**
 * <pre>
 * Pre-condition: obj is a valid game model object
 * Post-condition: updates all children models
 * </pre>
 * Loads the JSON response from the server and updates the entire model structure to match the updates
 * @method loadJsonGameModel
 * @param  {object} obj     The JSON response
 * @param  {function} success Callback on success
 * @param  {function} err     Callback on error
 * @return {void}         Nothing
 */
GameTable.prototype.loadJsonGameModel=function(obj,success,err){

};
