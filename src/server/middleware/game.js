// attach game ID to req object
// attached userIndex to reqObject
// user index is calculated by going into the correct game, looking up the player in the users array of the game that has the global playerID, and then based on position [0-3], setting that
var debug = require('debug')('catan:middleware:game');

module.exports = function(req, res, next){

  var catanGameCookie = req.cookies['catan.game'];
  debug('Cookies: ', req.cookies);

  if(catanGameCookie) {
    var gameID = parseInt(catanGameCookie);
    if (!isNaN(gameID)) {
      req.gameID = gameID;
      debug('Got game ID: ', req.gameID);
    }


  }
  next();
}
