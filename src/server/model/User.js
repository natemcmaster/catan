/**
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

function User(username, password,playerID){
  this.username = username;
  this.password = password;
  this.playerID = playerID;
};
