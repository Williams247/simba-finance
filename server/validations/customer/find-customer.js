const Joi = require("joi");

exports.validateFindUser = data => {
  const schema = Joi.object({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
  });
  return schema.validate(data)
};
