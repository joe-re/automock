'use strict';

const httpProxy = require('http-proxy');
const SelectedFile = require('./models/selected_file');
const _ = require('underscore');
const fs = require('fs');

class ProxyServer {
  constructor() {
    this.server = httpProxy.createProxyServer({ target:'http://localhost:3000' }).listen(8000);
    this.selectedFiles = [];
  }

  loadSelectedFiles() {
    SelectedFile.findAll().then((records) => {
      this.selectedFiles = records;
    });
  }

  start() {
    this.loadSelectedFiles();
    this.server.on('proxyRes', (_proxyRes, req, res) => {
      const filesNames = this.selectedFiles.map((file) => `/${file.name}`);
      if (_.includes(filesNames, req.url)) {
        const write = res.write, writeHead = res.writeHead, end = res.end, bufs = [];
        res.writeHead = (status, headers) => {
          res.write = (body) => {
            bufs.push(body);
          };

          res.end = () => {
            fs.readFile(`${process.env.AUTOMOCK_ROOT_PATH}${req.url}`, 'utf8', function (_err, text) {
              const mockData = JSON.parse(text);
              const body = mockData.response_body;
              res.setHeader('content-length', Buffer.byteLength(body, 'utf8'));
              status=222;
              writeHead.call(res, status, headers);
              write.call(res, body);
              end.call(res);
            });
          };
        };
      }
    });
  }
}

module.exports = ProxyServer;
