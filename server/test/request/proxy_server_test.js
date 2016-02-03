'use strict';

require('./common_hooks');
const request = require('superagent');
const assert = require('power-assert');

const http = require('http');
const ProxyServer = require('../../src/proxy_server');
const SelectedFile = require('../../dist/models/selected_file');
const fs = require('fs');

let targetServer;
let proxy;
describe('ProxyServer', () => {
  before(() => {
    process.env.AUTOMOCK_PROXY_PORT = 9999;
    process.env.AUTOMOCK_TARGET_PORT = 9998;
    targetServer = http.createServer((_req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World');
    });
    targetServer.listen(process.env.AUTOMOCK_TARGET_PORT, '127.0.0.1');
    proxy = new ProxyServer();
  });
  after(() => {
    targetServer.close();
  });

  context('has generated mock_data', () => {
    beforeEach((done) => {
      SelectedFile.create({ name: 'test.json', uri: '/test.json', method: 'GET' }).then(() => {
        proxy.start().then(done);
      });
    });
    it('receives mocked response data.', (done) => {
      request.get('http://127.0.0.1:9999/test.json').
        end((_err, res) => {
          fs.readFile(`${process.env.AUTOMOCK_DATA_PATH}/test.json`, 'utf8', (__err, text) => {
            const expected = JSON.parse(text);
            assert.equal(res.text, expected.response_body);
            assert.equal(res.header['Content-Length'], expected.response_header['content-length']);
            done();
          });
        });
    });
  });
  context("doesn't have generated mock_data", () => {
    beforeEach((done) => {
      proxy.start().then(done);
    });
    it('passes through response.', (done) => {
      request.get('http://127.0.0.1:9999/test.json').
      end((_err, res) => {
        assert.equal(res.text, 'Hello World');
        done();
      });
    });
  });
});
