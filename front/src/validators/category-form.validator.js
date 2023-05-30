import Joi from 'joi';

export const categoryFormValidator = Joi.object({
    categoryName: Joi.string().min(3).message('min length is 3')
});