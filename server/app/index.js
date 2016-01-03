'use strict';

const express = require('express');
const app = express();
const recursive = require('recursive-readdir');
const path = require('path');
const SelectedFile = require('./models/selected_file');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
let proxyServer;

app.get('/mock_files', function(_req, res){
  recursive(process.env.AUTOMOCK_DATA_PATH, (_err, filePaths) => {
    Promise.all(filePaths.map((filePath) =>
      new Promise((resolve) => {
        fs.readFile(filePath, 'utf8', (_err2, text) => {
          const mockData = JSON.parse(text);
          mockData.name = path.relative(process.env.AUTOMOCK_DATA_PATH, filePath);
          resolve(mockData);
        });
      })
    )).then((files) => {
      res.status(200).send(files);
    });
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
  SelectedFile.create({
    name: req.body.name,
    uri: req.body.uri,
    method: req.body.method
  }).then((selectedFile) => {
    res.status(201).send(selectedFile);
    proxyServer.loadSelectedFiles();
  });
});

app.delete('/selected_files/:id', function(req, res){
  SelectedFile.destroy({ where: { id: req.params.id } }).then(() => {
    res.status(204).send();
    proxyServer.loadSelectedFiles();
  });
});

if (!module.parent) {
  app.listen(process.env.AUTOMOCK_PORT || 8000);
  const ProxyServer = require('./proxy_server');
  proxyServer = new ProxyServer();
  proxyServer.start();
}


module.exports = app;
