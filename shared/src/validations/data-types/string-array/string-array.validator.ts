import * as joi from 'joi';

export const validateStringArrayWithJoi = joi.array().items(joi.string());
