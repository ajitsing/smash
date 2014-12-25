var session = require('express-session');
var Memcached = require('connect-memcached')(session);

var servers = { '127.0.0.1:11211': 1 };
var options = {};
var memcached = new Memcached(servers, options);

var logDetails = function(details){
	console.log(JSON.stringify(details, null, 4));
};

memcached.on('issue', logDetails);
memcached.on('failure', logDetails);
memcached.on('reconnecting', logDetails);
memcached.on('reconnected', logDetails);
memcached.on('remove', logDetails);

exports.preRequest = function(key, callback){
	memcached.get(key, function (err, data) {
		data && delete data.cookie;
		callback(data);
	});
};

exports.createMemcache = function(key, value){
	val = JSON.parse(value);

	memcached.set(key, val, 60000, function( err, result ){
	  console.dir(result);
	  err && console.error( "error => " + err );
	});
};
