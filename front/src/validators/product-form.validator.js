import Joi from 'joi';
export const productFormValidator = Joi.object({
    name: Joi.string().min(3).max(100),
    price: Joi.number().min(1).message('price must be minimum 1')
        .max(99999).message('price max value is 99999'),
    oldPrice: Joi.number().min(1).message('price must be minimum 1')
        .max(99999).message('price max value is 99999').allow(''),
    brand: Joi.string()
});