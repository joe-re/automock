var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('selected_files', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    name: { type: 'string', unique: true, notNull: 'true' },
    createdAt: { type: 'datetime' },
    updatedAt: { type: 'datetime' }
  }, callback);
};

exports.down = function(db, callback) {
  callback();
};
