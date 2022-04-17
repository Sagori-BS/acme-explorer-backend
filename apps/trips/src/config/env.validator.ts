import { commonEnvValidationObject } from '@common/common/validations/common/env/common-env.validation-object';
import * as joi from 'joi';

export const validateEnv = joi.object({
  ...commonEnvValidationObject
});
