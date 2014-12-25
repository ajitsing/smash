var express = require('express');
var http = require('http');
var path = require('path');
var smash = require('./src/smash');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

if(JSON.parse(process.env.CACHE)){
  console.log('[WARN] - Starting app with cache, and cache will be invalidated after ' + process.env.INVALIDATE_CACHE_AFTER  + ' seconds.');
}

app.post('/smash.json', smash.collectDataFromFacts);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Smash server listening on port ' + app.get('port'));
});
