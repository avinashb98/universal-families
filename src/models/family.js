const Sequelize = require('sequelize');
const db = require('../../config/db');

const Family = db.define('family', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  univId: {
    type: Sequelize.INTEGER
  },
  totalPower: {
    type: Sequelize.INTEGER
  }
});

module.exports = Family;
