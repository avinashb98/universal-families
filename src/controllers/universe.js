const Universe = require('../models/universe');

const create = async (req, res) => {
  let universe;
  try {
    universe = await Universe.create();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
  res.status(201).json({
    message: 'New universe successfully created',
    data: {
      id: universe.id
    }
  });
};

module.exports = {
  create
};
