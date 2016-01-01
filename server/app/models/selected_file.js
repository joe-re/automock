const Sequelize = require('sequelize');
const sequelize = require('./../db/sequelize');
const SelectedFile = sequelize.define('selected_files', {
  name: { type: Sequelize.STRING }
}, {
  freezeTableName: true
});

module.exports = SelectedFile;
