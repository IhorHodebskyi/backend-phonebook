const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  number: Joi.string().required(),
});

module.exports = {
  addSchema,
};
