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
          "description": "This is test API",
          "method": "GET",
          "name": "test.json",
          "response_body": "{\"users\":[{\"user\":{\"name\":\"dummy user\"}}]}",
          "response_header": {
            "Cache-Control": "max-age=0, private, must-revalidate",
            "Content-Length": "42",
            "Content-Type": "application/json; charset=utf-8",
            "ETag": "W/\"e224cce5657514dd4f022471dc9261c6\"",
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "SAMEORIGIN",
            "X-Request-Id": "fbdd7722-e642-4a49-8837-f3c14cc72a4e",
            "X-Runtime": "0.009382",
            "X-XSS-Protection": "1; mode=block"
          },
          "status": 200,
          "uri": "/test.json"
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

