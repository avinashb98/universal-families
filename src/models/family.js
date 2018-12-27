const Sequelize = require('sequelize');
const db = require('../../config/db');

const Family = db.define('family', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  universe: {
    type: Sequelize.INTEGER
  },
  totalPower: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

module.exports = Family;
