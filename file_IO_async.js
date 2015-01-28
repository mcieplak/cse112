var fs = require('fs');
var filename = process.argv[2];

fs.readFile(filename, function(err, data) {
  var stringArray = data.toString();
  var splitString = stringArray.split('\n');;
  console.log(--splitString.length);
});
