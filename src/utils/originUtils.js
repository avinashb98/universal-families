/* eslint-disable no-restricted-syntax */
const Family = require('../models/family');
const familyUtils = require('./familyUtils');

const groupFamiliesByUniverse = (families) => {
  const groupedFamilies = {};

  families.forEach((family) => {

    if (!groupedFamilies[family.familyIdentifier]) {
      groupedFamilies[family.familyIdentifier] = [];
    }

    groupedFamilies[family.familyIdentifier].push({
      id: family.id,
      universe: family.universe
    });

  });

  return groupedFamilies;

};

const mapFamiliesWithPower = families => new Promise((resolve, reject) => {
  const totalFamilies = Object.keys(families).length;
  Object.values(families)
    .forEach((family, familyIndex) => {
      const presentInUniverses = family.length;
      family
        .forEach(async (familyInUniverse, universeCount) => {
          let totalPower;
          try {
            totalPower = await familyUtils.getTotalPower(familyInUniverse.id);
          } catch (error) {
            reject(error);
          }
          familyInUniverse = { ...familyInUniverse, totalPower };
          if (
            familyIndex === totalFamilies - 1
          && universeCount === presentInUniverses - 1
          ) {
            resolve(families);
          }
        });
    });
});

const isBalanced = (families) => {
  for (const familyIdentifier in families) {
    // eslint-disable-next-line no-prototype-builtins
    if (families.hasOwnProperty(familyIdentifier)) {

      const everySuchFamily = families[familyIdentifier];
      for (let i = 0; i < everySuchFamily.length - 1; i += 1) {
        if (everySuchFamily[i].totalPower !== everySuchFamily[i + 1].totalPower) {
          return false;
        }
      }
    }
  }
  return true;
};

const powerBalanced = async () => {
  let families;
  try {
    families = await Family.findAll({});
  } catch (error) {
    console.log(error);
    throw error;
  }

  const originBalanced = (
    isBalanced(
      await mapFamiliesWithPower(
        groupFamiliesByUniverse(families)
      )
    )
  );

  return originBalanced;

};

module.exports = {
  powerBalanced
};
