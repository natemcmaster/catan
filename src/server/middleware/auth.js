module.exports = function(req, res, next){
  req.testval = "testval";
  next();
}
