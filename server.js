//'require' says "pull in this installed package"
var connect = require('connect');

//we're still using Node's built in HTTP server, so let's pull it in.
var http = require('http');

//create our middleware stack (just send a basic message for now):
var app = connect()
	//add logging to all requests
	.use(connect.logger())
	 //serve "static files from the public directory"
	 .use(connect.static(__dirname + '/public'))
	 //produce a special message when the path matches.
	 .use(function(req, res, next){
	 	if(req.url === '/hello_world'){
	 		res.write('Hello World!');
	 		res.end();
	 	}else{
	 		next();
	 	}
	 })
	//do the original request handling added in part 1.
	.use(function(request, response){
		response.write('Hello from connect!');
		response.end();
	});

//start a server on port 3000, any request that comes in should call
//the "app" function that is our middleware stack from above.
http.createServer(app).listen(3000);