const Sequelize = require('sequelize');
const db = require('../../config/db');

const Family = db.define('family', {
  // Unique Id. Cannot be same as any family in any universe
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // Family Identifier. Can be same accross universes
  familyIdentifier: {
    type: Sequelize.INTEGER
  },
  // Universe to which this family belongs to
  universe: {
    type: Sequelize.INTEGER
  }
});

module.exports = Family;
