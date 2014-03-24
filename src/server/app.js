var app = require('./catan')()
  , http = require('http');

// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Server listening on port ' + app.get('port'));
});
