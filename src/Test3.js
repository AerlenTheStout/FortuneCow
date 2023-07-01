const fs = require('node:fs');
var path = require("path");
var absolutePath = path.resolve("./TOKEN.txt");
console.log(absolutePath);

TOKEN = fs.readFile(absolutePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
});
console.log(TOKEN);