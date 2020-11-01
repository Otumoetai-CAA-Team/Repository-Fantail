//Test commit
var http = require('http');

function onRequest(request, response) {
    response.writeHead(200, {'Content-Type': 'test/plain'});
    response.write('Hello World');
    response.end();
}

http.createServer(onRequest).listen(8000);