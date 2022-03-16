let fs = require("fs");
let http = require("http");
// created a file using the fs module method  and added some content to it
fs.writeFileSync("readme.txt", " hey this  is the file you need to read");
// created a server
let server = http.createServer(handleRequest);
function handleRequest(req, res) {
  //Now Reading  the file
  fs.createReadStream("./readme.txt").pipe(res);
}
// listening to any request
server.listen(3000, "localhost", () => {
  console.log("server start listening at 3000 port");
});