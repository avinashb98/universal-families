const Universe = require('../models/universe');
const Family = require('../models/family');

const create = async (req, res) => {
  let universe;
  try {
    universe = await Universe.create();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error'
    });
    return;
  }
  res.status(201).json({
    message: 'New universe successfully created',
    data: {
      id: universe.id
    }
  });
};

const getFamilies = async (req, res) => {

  const { universe } = req.parsed;

  let families;
  try {
    families = await Family.findAll({ where: { universe } });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }

  if (!families.length) {
    res.status(404).json({
      message: `No families in the Universe ${universe}`
    });
    return;
  }

  res.status(200).json({
    message: `List of families in the Universe ${universe}`,
    data: { families }
  });

};

module.exports = {
  create,
  getFamilies
};
