var http = require('http');
var memcache = require('./memcache');

exports.getDataFromFacts = function(factUrls, callback){
	console.log("making " + factUrls.length + " requests!!");
	var jsonResponse = [];

	factUrls.forEach(function(factUrl){
		makeRequest(factUrl, function(response){
			jsonResponse.push(response);
			if(jsonResponse.length == factUrls.length) callback(jsonResponse);
		});
	});
};

var makeRequest = function(url, callback){
	memcache.preRequest(url.href, function(result){
		result ? callback(result) : actualRequest(url, callback);
	});
};

var actualRequest = function(url, callback){
	console.log("=> making actual request!!!!");

	http.get(url, function(resp){
		resp.on('data', function(buf){
			var data = JSON.parse(buf.toString('utf8', 0, {}));
			memcache.createMemcache(url.href, JSON.stringify(data));
			callback(data);
		}).on('error', function(err){
			console.error('error while getting data from endpoint => ' + url);
			console.error(err);
		});
	});
};
