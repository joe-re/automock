const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static(__dirname + '/assets'));

app.get('/mock_files', function(req, res){
  fs.readdir(process.env.AUTOMOCK_ROOT_PATH, function(err, files){
    if (err) throw err;
    var fileList = [];
    console.log();
    files.filter(function(file){
      console.log(file);
      return fs.statSync(process.env.AUTOMOCK_ROOT_PATH + '/' + file).isFile() && /.*\.json$/.test(file); //絞り込み
    }).forEach(function (file) {
      fileList.push(file);
    });
    res.status(200).send(fileList);
  });
});

if (!module.parent) {
  app.listen(3000);
}

module.exports = app;
