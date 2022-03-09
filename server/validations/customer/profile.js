const Joi = require("joi");

exports.validateUser = data => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(20),
    email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
    password: Joi.string().required()
  });
  return schema.validate(data)
};
