var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var async = require('async');

exports.up = function(db, callback) {
  async.series([
    db.addColumn.bind(db, 'selected_files', 'method', { type: 'string', notNull: true, defaultValue: 'dummy' }),
    db.addColumn.bind(db, 'selected_files', 'uri', { type: 'string', notNull: true, defaultValue: 'dummy' })
  ], callback);
};

exports.down = function(db, callback) {
  async.series([
    db.removeColumn.bind(db, 'selected_files', 'method'),
    db.removeColumn.bind(db, 'selected_files', 'uri')
  ], callback);
};
