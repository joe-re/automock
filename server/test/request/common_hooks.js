process.env.AUTOMOCK_ROOT_PATH=__dirname + '/../fixtures/mock';
process.env.NODE_ENV='test';

const sequelize = require('../../app/db/sequelize');
const SelectedFile = require('../../app/models/selected_file');

before(function() {
  const execSync = require('child_process').execSync;
  execSync('node ./../../node_modules/db-migrate/bin/db-migrate up --config app/db/database.json -e test');
});

beforeEach(function () {
  SelectedFile.truncate();
});

after(function() {
  sequelize.
    getQueryInterface().
    dropAllTables();
});
