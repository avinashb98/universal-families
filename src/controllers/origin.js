const originUtils = require('../utils/originUtils');

const powerBalanced = async (req, res) => {
  let isBalanced;
  try {
    isBalanced = await originUtils.powerBalanced();
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({
    message: 'Balance Status of Origin',
    data: {
      isBalanced
    }
  });
};

const getUnbalancedFamilies = async (req, res) => {
  try {
    const {
      unbalancedFamilies,
      peopleToAdd
    } = await originUtils.getUnbalancedFamilies();
    const originUnbalanced = unbalancedFamilies.length > 0;
    res.status(200).json({
      message: (
        originUnbalanced
          ? 'Unbalanced Families and Operations to balance them'
          : 'The Origin is completely balanced'
      ),
      data: {
        unbalancedFamilies,
        peopleToAdd
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Something Went Wrong'
    });
  }
};

module.exports = {
  powerBalanced,
  getUnbalancedFamilies
};
