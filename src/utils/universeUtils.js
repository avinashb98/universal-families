const Universe = require('../models/universe');
const Family = require('../models/family');
// const familyUtils = require('./familyUtils');

// Check whether a universe exists
const checkUniverse = async (id) => {
  let universe;
  try {
    universe = await Universe.findOne({ where: { id } });
  } catch (error) {
    return false;
  }
  if (!universe) {
    return false;
  }
  return true;
};

// Check for an existing family with same id
const checkExistingFamily = async (universe, familyId) => {
  let families;
  try {
    families = await Family.findAll({ where: { familyIdentifier: familyId, universe } });
  } catch (error) {
    console.log(error);
    return true;
  }

  if (families.length > 0) {
    return true;
  }


  return false;
};

module.exports = {
  checkUniverse,
  checkExistingFamily
};
