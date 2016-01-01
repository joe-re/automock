'use strict';

require('./common_hooks');
const request = require('supertest');
const SelectedFile = require('../../app/models/selected_file');
const assert = require('power-assert');

let server;
describe('GET /selected_files', function () {
  beforeEach(function () {
    server = require('./../../app/index');
    SelectedFile.create({ name: 'api/v1/joes_secret_file' });
  });
  it('creates new selectedFile and receives 201', function testSlash(done) {
    request(server).
      get('/selected_files').
      expect(200).
      end((_err, response) => {
        assert(response.body.length === 1);
        assert(response.body[0].name === 'api/v1/joes_secret_file');
        assert(!!response.body[0].id);
        done();
      });
  });
});

describe('POST /selected_files', function () {
  beforeEach(function () {
    server = require('./../../app/index');
  });
  it('creates new selectedFile and receives 201', function testSlash(done) {
    request(server).
      post('/selected_files').
      expect(201).
      end(() => {
        SelectedFile.count().then((result) => {
          assert(result === 1);
          done();
        });
      });
  });
});
