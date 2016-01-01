'use strict';

require('./common_hooks');
const request = require('supertest');

let server;
describe('GET /mock_files', function () {
  beforeEach(function () {
    server = require('./../../app/index');
  });
  it('receives mock_files and 200', function testSlash(done) {
    request(server).
      get('/mock_files').
      expect(200, [
        {
          'name': 'test.json'
        },
        {
          'name': 'api/v1/api_test.json'
        }
      ], done);
  });
});

