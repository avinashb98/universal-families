const Family = require('../models/family');
const utils = require('../utils/familyUtils');

const create = async (req, res) => {

  const { universe, familyId } = req.parsed;

  let family;
  try {
    family = await Family.create({
      universe, familyIdentifier: familyId
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error'
    });
    return;
  }

  res.status(201).json({
    message: 'New family successfully created',
    data: {
      familyId: family.familyId,
      universe: family.universe
    }
  });

};

const totalPower = async (req, res) => {
  const { id } = req.body;
  const power = await utils.getTotalPower(id);
  res.status(200).json({
    message: `Family ${id} Total Power`,
    data: {
      power
    }
  });
};

module.exports = {
  create,
  totalPower
};
