var urlUtils = require('url');

exports.mapToFactUrls = function(jsonData){
	var factUrls = [];
	var params = "?";

	Object.keys(jsonData.params).forEach(function(param){
		params +=  param + "=" + jsonData.params[param] + "&";
	});

	jsonData.urls.forEach(function(url){
		factUrls.push(urlUtils.parse(url+params));
	});

	return factUrls;
};
