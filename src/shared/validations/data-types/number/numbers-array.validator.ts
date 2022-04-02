import * as joi from 'joi';

export const validatePositiveNumbersArrayWithJoi = joi
  .array()
  .items(joi.number().positive());
