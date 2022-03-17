// Requiring all the core modules
let http = require("http");
let qs = require("querystring");
let path = require("path");

// Question one

console.log(__filename);

console.log(__dirname + '/app.js');


console.log('./index.html');

var indexPath = path.join(__dirname, 'index.html');

// Question two
// #### Capture data on server
// Q. Create a server using http
// - handle post method on '/' route
// - send json data on it from postman
let server = http.createServer(handleRequest);
function handleRequest(req, res) {
  if (req.method === "POST" && req.url === "/") {
    let result = "";
    req.on("data", (chunk) => {
      result += chunk;
    });
    req.on("end", () => {
      res.writeHead(201, "Content-Type : application/json");
      // console.log(result);
      res.end(result);
      
    });
  }
}


function handleRequest(req, res) {
  if (req.method === "POST" && req.url === "/") {
    let result = "";
    req.on("data", (chunk) => {
      result += chunk;
    });
    req.on("end", () => {
      res.statusCode = 201;
      var parseData = qs.parse(result);
      res.end(JSON.stringify(parseData)); 
      console.log(`Name of the captain is ${result.captain}`);
    });
  }
}



server.listen(5555, () => {
  console.log("Listening for a request on the 5555 port ");
});


// ******************* Question Four **************
// Q. Create server which can handle both json/form data without specifying which format of data is being received.
// - add listener on port 9000
// - parse respective data format i.e. json/form
// - send entire data in response
// - data sent from postman should have fields:
//   - city
//   - state
//   - country
//   - pin
let server2 = http.createServer(handleRequest2);
function handleRequest2(request, response) {
  let contentType = request.headers["content-type"];
  console.log(contentType);
  let data = "";
  request.on("data", (chunk) => {
    data += chunk;
  });
  request.on("end", () => {
    if (contentType === "application/x-www-form-urlencoded") {
      let result = qs.parse(data);
      // console.log(JSON.stringify(result));
      response.end(JSON.stringify(result));
    }
    if(contentType === 'application/json'){
      response.end(data);
    }
  });
}
server2.listen(9000, () => {
  console.log("server is listning at the 9k port ");
});

// ******************* Question five  *****************
// Q. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.
// - format of json data is {name: your name, email: "", }
// - Html response format is <h1>Name</h1><h2>email</h2>

let server = http.createServer(handleRequest);
function handleRequest(request, response) {
  let contentType = request.headers["content-type"];
  console.log(contentType);
  let data = "";
  request.on("data", (chunk) => {
    data += chunk;
  });
  request.on("end", () => {
    if (contentType === "application/x-www-form-urlencoded") {
      var formData = qs.parse(data);
      res.setHeader('content-Type', 'text/html');
      res.end(`<h2>${formData.name}</h2><p>${formData.email}</p>`);
    }
    if(contentType === 'application/json'){
      var jsonData = JSON.parse(data);
      response.setHeader('content-type', 'text/html');
      response.end(`<h2>${jsonData.name}</h2><p>${jsonData.email}</p>`);
    }
  });
}
server.listen(9000, () => {
  console.log("server is listning at the 9k port ");
});

