'use strict';

require('./common_hooks');
const request = require('supertest');

let server;
describe('GET /mock_files', function () {
  beforeEach(function () {
    server = require('./../../dist/index');
  });
  it('receives mock_files and 200', function testSlash(done) {
    request(server).
      get('/mock_files').
      expect(200, [
        {
          description: 'api description',
          method: 'POST',
          name: 'test.json',
          status: '201',
          response_body: '{\"users\":[{\"username\":\"sample\",\"email\":\"sample@ggg.com\"}]}',
          uri: '/api/v1/users'
        },
        {
          description: 'description',
          method: 'GET',
          name: 'api/v1/api_test.json',
          status: '200',
          response_body: '{\"users\":[{\"username\":\"sample\",\"email\":\"sample@ggg.com\"}]}',
          uri: '/api/v1/users'
        }
      ], done);
  });
});

