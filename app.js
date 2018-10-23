var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, resp){
  // Print the name of the file for which request is made.
  fs.readFile("11.html",function(error, data){
    if (error) {
      resp.writeHead(404);
      resp.write('Contents you are looking for-not found');
      resp.end();
    }  else {
      resp.writeHead(200, {
        'Content-Type': 'text/html'
      });
      resp.write(data.toString());
      resp.end();
    }
  });
});

server.listen(8000);