var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('selected_files', {
    id: { type: 'integer', primaryKey: true, autoIncrement: true },
    name: { type: 'string', unique: true },
    createdAt: { type: 'datetime' },
    updatedAt: { type: 'datetime' }
  }, callback);
};

exports.down = function(db, callback) {
  callback();
};
