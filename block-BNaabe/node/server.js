// Requiring all the core modules
let http = require("http");
let http2 = require("http");
let http3 = require("http");
let qs = require("querystring");
let path = require("path");

// i have used  ip address '127.0.0.1' to '127.0.0.1' that is equivalent to the localhost  because we can not use multiple localhost at a time in a file  so i have used different localserver

let serverFile = path.parse(__dirname + "/" + "server.js");
let appFile = path.parse(__dirname + "/" + "app.js");
let indexFile = path.parse(__dirname + "/" + "index.js");

// Question one

// - capture absolute path of `server.js`(itself)
console.log(`The path of the server file is ${__dirname + "/" + "server.js"}`);
// - get absolute path of `app.js`
console.log(`The path of the app  file is ${__dirname + "/" + "app.js"}`);
// - get realtive path of `index.html`
console.log("The  relative path of the index.html file is " + "./index.html");
// - get absolute path of `index.html` using `path module`
console.log(
  `absolute path of the index file is ${
    indexFile.dir + "/" + indexFile.name + indexFile.ext
  }`
);

// Question two
// #### Capture data on server
// Q. Create a server using http
// - handle post method on '/' route
// - send json data on it from postman
let server = http.createServer(handleRequest);
function handleRequest(req, res) {
  let result = "";
  req.on("data", (chunk) => {
    result += chunk;
  });
  req.on("end", () => {
    if (req.method === "POST" && req.url === "/") {
      res.writeHead(201, "Content-Type : application/json");
      // console.log(result);
      res.end(result);
    }
  });
}
server.listen(5555, "localhost", () => {
  console.log("Listening for a request on the 5555 port ");
});

// **********  Question three **************
// Only  captian name in the response
let server7 = http.createServer(handleRequest);
function handleRequest7(req, res) {
  let result = "";
  req.on("data", (chunk) => {
    result += chunk;
  });
  req.on("end", () => {
    if (req.method === "POST" && req.url === "/") {
      res.writeHead(201, "Content-Type : application/json");
      // console.log(result);
      res.end(`Name of the captain is ${result.captain}`);
    }
  });
}
server7.listen(8888, "127.0.0.8", () => {
  console.log("Listening for a request on the 8888 port ");
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
let server2 = http2.createServer(handleRequest2);
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
  });
}
server2.listen(9000, "127.0.0.3", () => {
  console.log("server is listning at the 9000 port ");
});

// ******************* Question five  *****************
// Q. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.
// - format of json data is {name: your name, email: "", }
// - Html response format is <h1>Name</h1><h2>email</h2>

let server9 = http.createServer(handleRequest9);
function handleRequest9(request, response) {
  let data = "";
  request.on("data", (chunk) => {
    data += chunk;
  });
  request.on("end", () => {
    let objectKeys = Object.keys(data);
    response.end(`<h1>${objectKeys[0]}</h1><h2>${objectKeys[1]}</h2>`);
  });
}
server9.listen(1111, "127.0.0.6", () => {
  console.log("Server is running on the port 1111");
});

// ********************* Question Six *******************

let server3 = http3.createServer(handleRequest3);
function handleRequest3(request, response) {
  let data = "";
  request.on("data", (chunk) => {
    data += chunk;
  });
  request.on("end", () => {
    let result = qs.parse(data);
    let objectKeys = Object.keys(result);
    response.setHeader("Content-Type", "text/html");
    response.end(`<h1>${objectKeys[0]}</h1><h2>${objectKeys[1]}</h2>`);
  });
}
server3.listen(10000, "127.0.0.5", () => {
  console.log("Server is running on the port 10000");
});