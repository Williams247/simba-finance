const Joi = require("joi");

// Validates negative amount values, empty amount values, valid emails, valid sending and receiving currencies
exports.validatePrimaryFields = data => {
  const schema = Joi.object({
    amount: Joi.number().positive().greater(0).required(),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
    sendingCurrency: Joi.string()
    .required()
    .valid('USD', 'EUR', 'NGN')
    .error(new Error('Provide a valid sending currency, i.e USD, EUR, NGN')),
    receivingCurrency: Joi.string()
    .required()
    .valid('USD', 'EUR', 'NGN')
    .error(new Error('Provide a valid receiving currency, i.e USD, EUR, NGN'))
  });
  return schema.validate(data)
};

// Validates negative amount values, empty amount values, validates currencies
exports.validateSecondaryFields = data => {
  const schema = Joi.object({
    currency: Joi.string()
    .required()
    .valid('USD', 'EUR', 'NGN')
    .error(new Error('Provide a valid sending currency, i.e USD, EUR, NGN')),
    amount: Joi.number()
    .positive()
    .greater(0)
    .required()
    .error(new Error('Your account balance is too low for this transaction'))
  })
  return schema.validate(data)
};

// Validate currencies only
exports.validateCurrencyValuesOnly = data => {
   const schema = Joi.object({
    currency: Joi.string()
    .required()
    .valid('USD', 'EUR', 'NGN')
    .error(new Error('Provide a valid sending currency, i.e USD, EUR, NGN'))
   })
  return schema.validate(data)
};

// Validates amounts only
exports.validateAmountValuesOnly = data => {
  const schema = Joi.object({
    amount: Joi.number()
    .positive()
    .greater(0)
    .required()
    .error(new Error('Your account balance is too low for this transaction'))
  })
  return schema.validate(data)
};
