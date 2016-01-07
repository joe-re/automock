const Sequelize = require('sequelize');
const sequelize = require('./../db/sequelize');
const SelectedFile = sequelize.define('selected_files', {
  name: { type: Sequelize.STRING },
  method: { type: Sequelize.STRING },
  uri: { type: Sequelize.STRING }
}, {
  freezeTableName: true
});

module.exports = SelectedFile;
