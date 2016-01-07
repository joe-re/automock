process.env.AUTOMOCK_DATA_PATH=__dirname + '/../fixtures/mock';
process.env.NODE_ENV='test';

const sequelize = require('../../dist/db/sequelize');
const SelectedFile = require('../../dist/models/selected_file');

before(function() {
  const execSync = require('child_process').execSync;
  execSync('node ./node_modules/db-migrate/bin/db-migrate up --config src/db/database.json -e test');
});

beforeEach(function (done) {
  SelectedFile.truncate().then(() => done());
});

after(function(done) {
  sequelize.
    getQueryInterface().
    dropAllTables().then(() => done());
});
