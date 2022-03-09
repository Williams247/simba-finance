const Joi = require("joi");

exports.validateLogin = data => {
  const schema = Joi.object({
    email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
    password: Joi.string().required()
  });
  return schema.validate(data)
};
