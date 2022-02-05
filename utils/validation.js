const Joi = require("joi");

// Validation with JOI
const postValidation = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    username: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .length(10)
      .pattern(/^\d+$/)
      .label("Invalid Phone Number"),
  });

  return schema.validate(user);
};

const putValidation = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    username: Joi.string().alphanum().min(3).max(20),
    email: Joi.string().email(),
    phone: Joi.string()
      .length(10)
      .pattern(/^\d+$/)
      .label("Invalid Phone Number"),
  });

  return schema.validate(user);
};

module.exports = { postValidation, putValidation };
