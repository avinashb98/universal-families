const Joi = require('joi');

const getFamiliesSchema = Joi.object().keys({
  universe: Joi.number().required()
});

const getFamilies = (req, res, next) => {
  const { error, value } = getFamiliesSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      message: error.message
    });
    return;
  }
  req.parsed = value;
  next();
};

module.exports = { getFamilies };
