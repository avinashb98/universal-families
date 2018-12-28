const Family = require('../models/family');

const powerBalanced = async () => {
  let families;
  try {
    families = await Family.findAll({});
  } catch (error) {
    console.log(error);
    throw error;
  }
  console.log(families);
};

module.exports = {
  powerBalanced
};
