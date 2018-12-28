const Sequelize = require('sequelize');
const db = require('../../config/db');

const Person = db.define('person', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // Unique Id of the family person belongs to (same as 'id' in family)
  family: {
    type: Sequelize.INTEGER
  },
  power: {
    type: Sequelize.INTEGER
  }
});

module.exports = Person;
