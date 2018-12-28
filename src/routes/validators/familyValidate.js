const Joi = require('joi');
const universeUtils = require('../../utils/universeUtils');

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
  const universeExists = await universeUtils.checkUniverse(value.universe);
  if (!universeExists) {
    res.status(404).json({
      message: 'Universe not Found. Create Universe First'
    });
    return;
  }

  // Cannot have duplicate families in a universe
  const existsFamilyWithId = await universeUtils
    .checkExistingFamily(
      value.universe, value.familyId
    );

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

const totalPower = async (req, res, next) => {
  next();
};

module.exports = { create, totalPower };
