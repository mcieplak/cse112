var fs = require('fs');
var dir = process.argv[2];
var filter = process.argv[3];
var extName = "." + filter;

fs.readdir(dir, function(err, list) {
  for(var i = 0; i < list.length; i++) {
    if(extName.test(list[i])) {
      console.log(list[i]);
    }
  }
});
