var http = require('http');

exports.getDataFromFacts = function(factUrls, callback){
	console.log("making " + factUrls.length + " requests, sit tight!!");
	var jsonResponse = [];

	factUrls.forEach(function(factUrl){
		makeRequest(factUrl, function(response){
			jsonResponse.push(response);
			if(jsonResponse.length == factUrls.length) callback(jsonResponse);
		});
	});
};

var makeRequest = function(url, callback){
	http.get(url, function(resp){
		resp.on('data', function(buf){
			var data = JSON.parse(buf.toString('utf8', 0, {}));
			callback(data);
		});
	});
};
