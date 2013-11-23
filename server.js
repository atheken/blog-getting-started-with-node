//We're switching to "express", instead of "connect", 
//because it _extends connect_ with some useful middleware/http request handling.
var express = require('express');

var Wiki = require("wikijs");

//we're still using Node's built in HTTP server, so let's pull it in.
var http = require('http');

//create our middleware stack (just send a basic message for now):
var app = express()
	//add logging to all requests
	.use(express.logger())
	 //serve "static files from the public directory"
	 .use(express.static(__dirname + '/public'))

	 // adding a new search to wikipedia, limiting to 25 entries, for now.
	 // notice that we are now using ".get" instead of ".use", Express
	 // adds .get/.post/.put/.delete/.all methods to allow the creation of RESTful HTTP endpoints
	 .get('/search', function(req, res, next){

	 	//Express also makes it easy to read GET/POST params from the request using .param
	 	var query = req.param('q');
	 	Wiki.search(query, 25, function(err, results){
	 		if(err){
	 			next(err);
	 		}else{
	 			//Express also allows us to write non-html responses _easily_, like JSON.
	 			res.json(results);
	 		}
	 	})
	 })
	//do the original request handling added in part 1.
	.use(function(request, response){
		response.write('Hello from connect!');
		response.end();
	});

//start a server on port 3000, any request that comes in should call
//the "app" function that is our middleware stack from above.
http.createServer(app).listen(3000);