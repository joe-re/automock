'use strict';

const request = require('supertest');

process.env.AUTOMOCK_ROOT_PATH=__dirname + '/../fixtures/mock';

let server;

describe('loading express', function () {
  beforeEach(function () {
    server = require('./../../app/index');
  });
  it('responds to /mock_files', function testSlash(done) {
    request(server)
      .get('/mock_files')
      .expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});

