var fs = require('fs');

var filename = process.argv[2];

var file = fs.readFileSync(filename.toString());

var str = file.toString();

var splitString = str.split('\n');

console.log(--splitString.length);
