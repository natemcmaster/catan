/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

var buildRoot = path.join(__dirname,'..','..','build');

// all environments
app.set('port', process.env.PORT || 8081);
app.set('views', path.join(__dirname, 'views'));
app.use(express.favicon());
app.use(express.logger('dev'));
//app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

app.use('/',express.static(path.resolve(buildRoot, './gameplay')));
app.use('/docs/',express.static(path.resolve(buildRoot, './docs/')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var controllers = require('./controllers');
var model={};
for(var c in controllers){
	var d = new controllers[c](app,model);
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Server listening on port ' + app.get('port'));
});
