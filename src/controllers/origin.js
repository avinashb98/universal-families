const originUtils = require('../utils/originUtils');

const powerBalanced = async (req, res) => {
  await originUtils();
  res.send('Ok');
};

module.exports = {
  powerBalanced
};
