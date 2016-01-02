const express = require('express');
const app = express();
const recursive = require('recursive-readdir');
const path = require('path');
const SelectedFile = require('./models/selected_file');
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/mock_files', function(req, res){
  recursive(process.env.AUTOMOCK_ROOT_PATH, function (err, files) {
    const relativePaths = files.map((file) => {
      return { name: path.relative(process.env.AUTOMOCK_ROOT_PATH, file) };
    });
    res.status(200).send(relativePaths);
  });
});

app.get('/selected_files', function(req, res){
  SelectedFile.findAll().
    then((files) => {
      const response = files.map((file) => {
        return {
          id: file.id,
          name: file.name
        };
      });
      res.status(200).send(response);
    });
});

app.post('/selected_files', function(req, res){
  SelectedFile.create({ name: req.body.name }).then((selectedFile) => {
    res.status(201).send(selectedFile);
  });
});

app.delete('/selected_files/:id', function(req, res){
  SelectedFile.destroy({ where: { id: req.params.id } }).then((selectedFile) => {
    res.status(204).send(selectedFile);
  });
});

if (!module.parent) {
  app.listen(3000);
}

module.exports = app;
