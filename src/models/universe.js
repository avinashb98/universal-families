const Sequelize = require('sequelize');
const db = require('../../config/db');

const Universe = db.define('universe', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});

module.exports = Universe;
