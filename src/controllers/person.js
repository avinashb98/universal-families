const Person = require('../models/person');
const Family = require('../models/family');

const checkFamily = async (id) => {
  let family;
  try {
    family = await Family.findOne({ where: { id } });
  } catch (error) {
    return false;
  }
  if (!family) {
    return false;
  }
  return true;
};

const create = async (req, res) => {

  const { family, power } = req.parsed;
  const familyExists = await checkFamily(family);
  if (!familyExists) {
    res.status(404).json({
      message: 'Family not Found. Create Family First'
    });
    return;
  }

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
