/* eslint-disable guard-for-in */
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
          // eslint-disable-next-line no-param-reassign
          familyInUniverse.totalPower = totalPower;
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


/**
 * Returns a whether families are balanced accross universes
 */
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


/**
 * Find unbalanced families and operations to balance them
 */
const getUnbalancedFamilies = async () => {

  // Get all families
  let families;
  try {
    families = await Family.findAll({});
  } catch (error) {
    throw error;
  }

  // Arrange families by familyIdentifier and Map them with respective powers
  let mappedFamilies;
  try {
    mappedFamilies = await mapFamiliesWithPower(
      groupFamiliesByUniverse(families)
    );
  } catch (error) {
    throw error;
  }

  const unbalancedFamilies = [];
  const peopleToAdd = [];

  for (const familyIdentifier in mappedFamilies) {
    const everySuchFamily = mappedFamilies[familyIdentifier];

    // Store the family with maximum power from same identifier families
    let maxPower = Number.MIN_SAFE_INTEGER;
    for (const family of everySuchFamily) {
      if (family.totalPower > maxPower) {
        maxPower = family.totalPower;
      }
    }

    const familyPushedToUnbalanced = false;
    for (const family of everySuchFamily) {
      if (family.totalPower !== maxPower) {

        // Record the family identifier to be unbalanced
        if (!familyPushedToUnbalanced) {
          unbalancedFamilies.push({
            familyIdentifier
          });
        }

        /**
         * A person needs to be added to the family,
         * who has power equal to the difference in power
         * between the current family and the family with the
         * maximum power
         * */
        peopleToAdd.push({
          family: family.id,
          power: maxPower - family.totalPower
        });
      }
    }
  }

  return { unbalancedFamilies, peopleToAdd };
};

module.exports = {
  powerBalanced,
  getUnbalancedFamilies
};
