/**
 * This module contains functionality for the user
 *
 * @module catan.server.model
 * @namespace servermodel
 */

module.exports = User;

/**
 * <pre>
 * Invariant: NONE
 * </pre>
 * @class User
 * @constructor
 */
//var id = 0;

function User(username, password,playerID){
	//this.userID = id++;
  this.username = username;
  this.password = password;
  this.playerID = playerID;
};
