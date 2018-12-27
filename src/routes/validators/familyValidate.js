const Joi = require('joi');
const Universe = require('../../models/universe');
const Family = require('../../models/family');

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

// Input Schema
const createSchema = Joi.object().keys({
  universe: Joi.number().required(),
  familyId: Joi.number().required()
});


const create = async (req, res, next) => {

  // Input Validation
  const { error, value } = createSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      message: error.message
    });
    return;
  }

  // Cannot create family in a non-existent universe
  const universeExists = await checkUniverse(value.universe);
  if (!universeExists) {
    res.status(404).json({
      message: 'Universe not Found. Create Universe First'
    });
    return;
  }

  // Cannot have duplicate families in a universe
  const existsFamilyWithId = await checkExistingFamily(value.universe, value.familyId);
  console.log(existsFamilyWithId);
  if (existsFamilyWithId) {
    res.status(401).json({
      message: `There already exists a family with id ${value.familyId} in universe ${value.universe}`
    });
    return;
  }

  req.parsed = value;
  next();
};

module.exports = { create };
