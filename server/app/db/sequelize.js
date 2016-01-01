const Sequelize = require('sequelize');
const storage = process.env.NODE_ENV === 'test' ? ':memory:' : './automock.db';
const sequelize = new Sequelize('automock', '', '', { dialect:'sqlite', storage });
module.exports = sequelize;
