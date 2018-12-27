const Family = require('../models/family');
const Universe = require('../models/universe');

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

const create = async (req, res) => {

  const { universe } = req.parsed;
  const universeExists = await checkUniverse(universe);
  if (!universeExists) {
    res.status(404).json({
      message: 'Universe not Found. Create Universe First'
    });
    return;
  }

  let family;
  try {
    family = await Family.create({
      universe
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
      id: family.id,
      universe: family.universe,
      totalPower: family.totalPower
    }
  });

};

module.exports = {
  create
};
