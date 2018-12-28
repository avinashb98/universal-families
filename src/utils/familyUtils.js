const Person = require('../models/person');
const Family = require('../models/family');

const familyExists = async (id) => {
  let family;
  try {
    family = await Family.findOne({ where: { id } });
  } catch (error) {
    console.log(error);
    return false;
  }
  if (!family) {
    return false;
  }
  return true;
};

const getTotalPower = async (id) => {
  let people;
  try {
    people = await Person.findAll({ where: { family: id } });
  } catch (error) {
    console.log(error);
    throw error;
  }

  if (people.length === 0) {
    return 0;
  }
  let sum = 0;
  people.forEach((person) => {
    sum += person.power;
  });
  return sum;
};

module.exports = {
  getTotalPower,
  familyExists
};
