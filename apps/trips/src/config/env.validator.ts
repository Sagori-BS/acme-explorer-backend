import { commonEnvValidationObject } from '@shared/validations/common/env/common-env.validation-object';
import * as joi from 'joi';

export const validateEnv = joi.object({
  ...commonEnvValidationObject
});
