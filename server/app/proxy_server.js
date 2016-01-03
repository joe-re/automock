'use strict';

const httpProxy = require('http-proxy');
const SelectedFile = require('./models/selected_file');
const _ = require('underscore');
const fs = require('fs');

class ProxyServer {
  constructor() {
    const targetPort = process.env.AUTOMOCK_TARGET_PORT || 3000;
    const proxyPort = process.env.AUTOMOCK_PROXY_PORT || 8001;
    this.server = httpProxy.createProxyServer({
      target:`http://localhost:${targetPort}`
    }).listen(proxyPort);
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
      const lookupedSelectedFile = _.find(this.selectedFiles, (selectedFile) =>
        (selectedFile.uri === req.url) && (selectedFile.method === req.method)
      );
      if (lookupedSelectedFile) {
        const write = res.write, writeHead = res.writeHead, end = res.end, bufs = [];
        res.writeHead = (_status, _headers) => {
          res.write = (body) => {
            bufs.push(body);
          };
          res.end = () => {
            fs.readFile(`${process.env.AUTOMOCK_DATA_PATH}/${lookupedSelectedFile.name}`, 'utf8', function (_err, text) {
              const mockData = JSON.parse(text);
              writeHead.call(res, mockData.status, mockData.response_header);
              write.call(res, mockData.response_body);
              end.call(res);
            });
          };
        };
      }
    });
  }
}

module.exports = ProxyServer;
