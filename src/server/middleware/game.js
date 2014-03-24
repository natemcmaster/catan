// attach game ID to req object
// attached userIndex to reqObject
// user index is calculated by going into the correct game, looking up the player in the users array of the game that has the global playerID, and then based on position [0-3], setting that
var debug = require('debug')('catan:middleware:game');

module.exports = function(req, res, next){
<<<<<<< HEAD
  var catanGameNumber = req.cookies['catan.game'];

  if(catanGameNumber) {
    req.gameId = catanGameNumber;

    var game = _.find(req.gameRoom.listGames(), function(game){
      return game.id == req.gameId;
    });

    // sets corresponding local playerIndex using global req.playerID set in the 'auth.js' middleware
    req.userIndex = game.indexOf(req.playerID);

    next();
  } else {
    res.send(400);
  }
=======
  var catanGameCookie = req.cookies['catan.game'];
  debug('Cookies: ', req.cookies);

  if(catanGameCookie) {
    var gameID = parseInt(catanGameCookie);
    if (!isNaN(gameID)) {
      req.gameID = gameID;
      debug('Got game ID: ', req.gameID);
    }
    //req.userIndex = TODO: calculate game-specific userIndex based on global playerId in cookie

  } 
  next();
>>>>>>> 3b3f757ac5fe74a09e5c9a71ad17743128f6d634
}
