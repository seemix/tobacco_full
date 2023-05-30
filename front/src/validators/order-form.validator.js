import Joi from 'joi';

export const orderFormValidator = Joi.object({
    customerName: Joi.string()
        .alphanum().message('only alphanumeric symbols')
        .min(2).message('name must be at least 2 symbols')
        .max(25).message('name must be maximum 25 symbols').required(),
    customerSurname: Joi.string()
        .alphanum().message('only alphanumeric symbols')
        .min(3).message('name must be at least 3 symbols')
        .max(25).message('name must be maximum 25 symbols').required(),
    customerPhone: Joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits` }).required(),
    address: Joi.string().min(10).message('Address must contain at least 10 symbols')
});
