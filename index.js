// load the core node http module
const http = require("http");

const fs = require("fs").promises;

const requestListener = function(req, res) {
  // output request url
  console.log(req.url);

  if (req.url === "/") {
    // check request url, if root, return html file
    // special variable __dirname has absolute path of where node code is running
    fs.readFile( __dirname + "/mySite.html" )
      .then(
        contents => {
          // set http response header entry
          res.setHeader("Content-Type", "text/html; charset=UTF-8");
          // return 200 OK http status code
          res.writeHead(200);
          // send back file contents + close response
          res.end(contents);
        }
      )
  } else {
    // if request url not root, return json file
    fs.readFile(__dirname + "/webInfo.json")
      .then(contents => {
        // set http response header entry
        res.setHeader("Content-Type", "application/json; charset=UTF-8");
        // return 200 OK http status code
        res.writeHead(200);
        res.end(contents);
      });
    
  }
};

const myServer = http.createServer(requestListener);

// define the TCP port and IP address to tell our http server to listen to
const host = "0.0.0.0";
const port = "8080";

// call the listen() method to start listening to http requests
myServer.listen(
  port,
  host,
  () => {
    console.log('Server is running');
  }
);