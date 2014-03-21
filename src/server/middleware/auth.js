
module.exports = function(req, res, next){
  var catanUserCookie = req.cookies['catan.user'];

  if(catanUserCookie){
    var parsedCatanUser = JSON.parse(catanUserCookie);
    req.playerID = parsedCatanUser.playerID || false;
  }
  next();

}
