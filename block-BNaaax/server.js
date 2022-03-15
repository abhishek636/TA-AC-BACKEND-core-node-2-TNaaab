let path = require('path');
let absolutePath = __dirname;
let relativePath = './server.js';

var formPath = path.join(__dirname,`${relativePath}`);

console.log(formPath, relativePath);