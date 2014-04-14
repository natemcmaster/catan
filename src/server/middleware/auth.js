var HttpError = require('../../common/Errors').HttpError;
var debug = require('debug')('catan:middleware:auth');

module.exports = function(req, res, next){
  var catanUserCookie = req.cookies['catan.user'];

  if(catanUserCookie){
    var parsedCatanUser = JSON.parse(catanUserCookie);
    req.playerID = (parsedCatanUser.playerID === 0) ? 0 :parsedCatanUser.playerID || false;
    debug('Found player cookie, ID:', parsedCatanUser.playerID);
  }
  
  req.isAuthorized = function(){
  	return !!req.playerID || req.playerID===0;
  }

  req.authorize = function(){
  	if(!this.isAuthorized()){
  		throw new HttpError(403);
  	}
  }
  next();

}
