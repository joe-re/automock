'use strict';

require('./common_hooks');
const request = require('supertest');
const SelectedFile = require('../../app/models/selected_file');
const assert = require('power-assert');

let server;
describe('GET /selected_files', function () {
  context('has existing mock_data', () => {
    beforeEach(function () {
      server = require('./../../app/index');
      SelectedFile.create({ name: 'test.json' });
      console.log('create?');
    });
    it('get selectedFiles and receives 200', function testSlash(done) {
      request(server).
        get('/selected_files').
        expect(200).
        end((_err, response) => {
          assert(response.body.length === 1);
          assert(response.body[0].name === 'test.json');
          assert(!!response.body[0].id);
          done();
        });
    });
  });

  context("hasn't existing mock_data", () => {
    beforeEach(function (done) {
      server = require('./../../app/index');
      SelectedFile.create({ name: 'not_exist_file.json' }).then(done());
    });
    it('get [] and receives 200', function testSlash(done) {
      request(server).
        get('/selected_files').
        expect(200).
        end((_err, response) => {
          console.log(response.body);
          assert(response.body.length === 0);
          done();
        });
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
      request(server).delete('/selected_files/' + result.id).expect(204).end(() => {
        SelectedFile.count().then((count) => {
          assert(count === 0);
          done();
        });
      });
    });
  });
});
