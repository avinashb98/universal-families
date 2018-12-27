const Family = require('../models/family');

const create = async (req, res) => {

  const { universe } = req.body;

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