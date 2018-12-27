const Sequelize = require('sequelize');
const db = require('../../config/db');

const Person = db.define('person', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  famId: {
    type: Sequelize.INTEGER
  },
  power: {
    type: Sequelize.INTEGER
  }
});

module.exports = Person;
