var async = require('async');
var mediator = require('./mediator');
var utils = require('./utils');

exports.collectDataFromFacts = function(req, res){
	var factUrls = [];

	async.series([
		function(callback){
			factUrls = utils.mapToFactUrls(req.body);
			callback(null, factUrls);
		},

		function(callback){
			mediator.getDataFromFacts(factUrls, function(data){
				res.send(data)
			});
		}
	]);
};
