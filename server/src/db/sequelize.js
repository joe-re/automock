const Sequelize = require('sequelize');
const storage = process.env.NODE_ENV === 'test' ? './automock_test.db' : './automock.db';
const sequelize = new Sequelize('automock', '', '', { dialect:'sqlite', storage });
module.exports = sequelize;
