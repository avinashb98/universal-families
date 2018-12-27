const Family = require('../models/family');

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

module.exports = {
  create
};
