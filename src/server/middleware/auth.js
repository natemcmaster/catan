
module.exports = function(req, res, next){
  var catanUserCookie = req.cookies['catan.user'];

  if(catanUserCookie){
    var parsedCatanUser = JSON.parse(decodeURIComponent(catanUserCookie));
    req.playerID = parsedCatanUser.playerID;
    next();
  } else {
    res.send(400);
  }


}
