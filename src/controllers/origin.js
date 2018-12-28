const originUtils = require('../utils/originUtils');

const powerBalanced = async (req, res) => {
  const isBalanced = await originUtils.powerBalanced();
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
