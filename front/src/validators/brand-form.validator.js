import Joi from 'joi';

export const brandFormValidator = Joi.object({
    name: Joi.string().min(3).message('minimal length is 3 symbols')
        .max(25).message('maximal length is 25 symbols')
        .alphanum()
});