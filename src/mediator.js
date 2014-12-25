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
	if(JSON.parse(process.env.CACHE)){
		memcache.preRequest(url.href, function(result){
			result ? callback(JSON.parse(result)) : actualRequest(url, callback);
		});

	} else {
		actualRequest(url, callback);
	}
};

var actualRequest = function(url, callback){
	http.get(url, function(resp){
		var data = '';
		resp.on('data', function(buf){
			data += buf.toString();

		}).on('end', function(){
			if(JSON.parse(process.env.CACHE)){
				memcache.createMemcache(url.href, JSON.stringify(data));
			}
			callback(JSON.parse(data));

		}).on('error', function(err){
			console.error('error while getting data from endpoint => ' + url);
			console.error(err);
		});
	});
};
