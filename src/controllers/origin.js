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

module.exports = {
  powerBalanced
};
