'use strict';

const assert = require('power-assert');
const request = require('supertest');

describe('サンプルテスト', function() {
  it('テスト項目: 1', function() {
    assert(1 + 1, 2);
  });
  it('テスト項目: 2', function() {
    assert.notDeepEqual({ a: 1 }, { a: 1, b: 2 });
  });
});
