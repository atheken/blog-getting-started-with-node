//'require' says "pull in this installed package"
var connect = require('connect');

//we're still using Node's built in HTTP server, so let's pull it in.
var http = require('http');

//create our middleware stack (just send a basic message for now):
var app = connect()
	.use(function(request, response){
		response.write('Hello from connect!');
		response.end();
	});

//start a server on port 3000, any request that comes in should call
//the "app" function that is our middleware stack from above.
http.createServer(app).listen(3000);