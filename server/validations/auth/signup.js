const Joi = require("joi");

exports.validateSignUp = data => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(30),
    email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
    password: Joi.string().required()
  });
  return schema.validate(data)
};
