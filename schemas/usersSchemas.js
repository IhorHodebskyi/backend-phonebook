const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const singUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(emailRegexp).required(),
  password: Joi.string().min(3).required(),
}).messages({
  "any.required": `Missing required {#key} field`,
  "object.unknown": `{#key} field is not allowed`,
});

const loginSchema = Joi.object({
  email: Joi.string().email(emailRegexp).required(),
  password: Joi.string().min(3).required(),
}).messages({
  "any.required": `Missing required {#key} field`,
  "object.unknown": `{#key} field is not allowed`,
});

module.exports = {
  singUpSchema,
  loginSchema,
};
