const Joi = require('joi');

const createSchema = Joi.object().keys({
  family: Joi.number().required(),
  power: Joi.number().required(),
});

const create = (req, res, next) => {
  const { error, value } = createSchema.validate(req.body);

  if (error) {
    res.status(400).json({
      message: error.message
    });
    return;
  }

  req.parsed = value;
  next();
};

module.exports = { create };
