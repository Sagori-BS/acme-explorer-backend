import * as joi from 'joi';

export const validateStringWithJoi = joi.string();

export const validateNotEmptyStringWithJoi = joi.string().min(1);
