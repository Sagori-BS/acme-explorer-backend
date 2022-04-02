import * as joi from 'joi';

export const validateDeviceTokensWithJoi = joi.array().items(joi.string());

export const validateDeviceTokenWithJoi = joi.string();
