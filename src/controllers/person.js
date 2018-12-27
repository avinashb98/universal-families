const Person = require('../models/person');

const create = async (req, res) => {

  const { family, power } = req.parsed;

  let person;
  try {
    person = await Person.create({
      family, power
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error'
    });
    return;
  }

  res.status(201).json({
    message: 'New Person successfully created',
    data: {
      id: person.id,
      family: person.family,
      power: person.power
    }
  });

};

module.exports = {
  create
};
