var makeApp = require('./catan')
  , http = require('http')
  , path = require('path');

if (process.argv.length < 3) {
  console.error('Usage: node app.js path/to/pl-plugin.js deltaNumber')
  process.exit(2)
}
try {
  var plPath = path.resolve(process.cwd(),process.argv[2]);
  var PlClass = require(plPath);
  var deltaNumber = parseInt(process.argv[3], 10);
} catch (e) {
  console.error('Could not find the plugin!')
  console.error('Usage: node app.js path/to/pl-plugin.js deltaNumber')
  process.exit(2)
}

makeApp(function (app) {
  // start server
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Server listening on port ' + app.get('port'));
  });
}, PlClass, deltaNumber)

