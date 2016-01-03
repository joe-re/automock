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
      send({ name: 'bar', method: 'GET', uri: '/api/v1/test' }).
      expect(201).
      end(() => {
        SelectedFile.findAll().then((result) => {
          assert(result.length === 1);
          assert(result[0].name === 'bar');
          assert(result[0].method === 'GET');
          assert(result[0].uri === '/api/v1/test');
          done();
        });
      });
  });
});


describe('DELETE /selected_files/:id', function () {
  beforeEach(function () {
    server = require('./../../app/index');
  });
  it('delete the selectedFile and receives 204', function testSlash(done) {
    SelectedFile.create({ name: 'api/v1/joes_secret_file' }).then((result) => {
      console.log(result);
      request(server).delete('/selected_files/' + result.id).expect(204).end(() => {
        SelectedFile.count().then((count) => {
          assert(count === 0);
          done();
        });
      });
    });
  });
});
