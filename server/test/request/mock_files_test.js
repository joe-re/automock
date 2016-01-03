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
          description: 'api description',
          method: 'POST',
          name: 'test.json',
          response_body: '{\"users\":[{\"username\":\"sample\",\"email\":\"sample@ggg.com\"}]}',
          uri: '/api/v1/users'
        },
        {
          description: 'description',
          method: 'GET',
          name: 'api/v1/api_test.json',
          response_body: '{\"users\":[{\"username\":\"sample\",\"email\":\"sample@ggg.com\"}]}',
          uri: '/api/v1/users'
        }
      ], done);
  });
});

