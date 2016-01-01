const express = require('express');
const app = express();
const recursive = require('recursive-readdir');
const path = require('path');
const SelectedFile = require('./models/selected_file');

app.use(express.static(__dirname + '/assets'));

app.get('/mock_files', function(req, res){
  recursive(process.env.AUTOMOCK_ROOT_PATH, function (err, files) {
    const relativePaths = files.map((file) => {
      return path.relative(process.env.AUTOMOCK_ROOT_PATH, file);
    });
    res.status(200).send(relativePaths);
  });
});

app.post('/selected_files', function(req, res){
  SelectedFile.create({ name: req.name }).
  then((selectedFile) => {
    res.status(201).send(selectedFile);
  });
});

if (!module.parent) {
  app.listen(3000);
}

module.exports = app;
