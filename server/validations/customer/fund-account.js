const Joi = require("joi");

exports.validateFundAccount = data => {
  const schema = Joi.object({
    amount: Joi.number().positive().greater(0).required(),
    currency: Joi.string()
    .required()
    .valid('USD', 'EUR', 'NGN')
    .error(new Error('Provide a valid receiving currency, i.e USD, EUR, NGN'))
  });
  return schema.validate(data)
};
