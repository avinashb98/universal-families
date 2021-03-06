const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URI, { logging: false });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync({
  force: false
})
  .then(() => {
    console.log('success sync');
  });

module.exports = sequelize;
