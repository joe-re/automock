'use strict';

require('./common_hooks');
const request = require('supertest');
const SelectedFile = require('../../app/models/selected_file');
const assert = require('power-assert');

let server;
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
          assert(result, 1);
          done();
        });
      });
  });
});
