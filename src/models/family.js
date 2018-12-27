const Sequelize = require('sequelize');
const db = require('../../config/db');

const Family = db.define('family', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  familyIdentifier: {
    type: Sequelize.INTEGER
  },
  universe: {
    type: Sequelize.INTEGER
  }
});

module.exports = Family;
