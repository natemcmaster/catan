// Game cookie is set upon user's joining a game
// attach game ID to req object
// attached userIndex to reqObject
  // user index is calculated by going into the correct game, looking up the player in the users array of the game that has the global playerID, and then based on position [0-3], setting that
var _ = require('lodash');

module.exports = function(req, res, next){
  var catanGameCookie = req.cookies['catan.game'];

  if(catanGameCookie) {
  	var parsedCatanGameCookie = JSON.parse(catanGameCookie);
    req.gameID = parsedCatanGameCookie.gameID || false;
    //req.userIndex = TODO: calculate game-specific userIndex based on global playerId in cookie

  } 
  next();
}
