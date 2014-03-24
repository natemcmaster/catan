// attach game ID to req object
// attached userIndex to reqObject
  // user index is calculated by going into the correct game, looking up the player in the users array of the game that has the global playerID, and then based on position [0-3], setting that
var _ = require('lodash');

module.exports = function(req, res, next){
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
}
