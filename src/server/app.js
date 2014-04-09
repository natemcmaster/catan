var makeApp = require('./catan')
  , http = require('http');

if (process.argv.length < 3) {
  console.error('Usage: node app.js path/to/pl-plugin.js deltaNumber')
  process.exit(2)
}
try {
  var PlClass = require(process.argv[1]);
  var deltaNumber = parseInt(process.argv[2], 10);
} catch (e) {
  console.error('Usage: node app.js path/to/pl-plugin.js deltaNumber')
  process.exit(2)
}

makeApp(function (app) {
  // start server
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Server listening on port ' + app.get('port'));
  });
}, PlClass, deltaNumber)

