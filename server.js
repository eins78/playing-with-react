var fs = require('fs'),
    http = require('http');

var server = http.createServer(function (req, res) {
  console.log(req.method, req.url, new Date().getTime());
  
  // serve Files
  if (req.method === "GET") {
    var file = (req.url === "/") ? '/index.html' : req.url;

    fs.readFile('.'+file, {encoding:"utf8"}, function (err, data) {
      if (err) {
        res.writeHead(404);
        return res.end("Not found! " + err, "utf8");
      }
      // console.log(data.toString());
      return res.end(data.toString(), "utf8");
    });
  }
  
  // "API" ;)
  else if (req.method === "POST") {
    
    var body = "";
    request.on('data', function (data) {
      body += data;
    });
    
    request.on('end', function () {
      
      fs.writeFile('.'+req.url, 'Hello Node', function (err) {
        if (err) {
          res.writeHead(500);
        }
        return res.end();
      });
      
    });
      
  }
  
  else {
    // if we reach this, we don't know what to do
    res.writeHead(500);
    return res.end("FAIL");    
  }
  
}).listen(1337);

