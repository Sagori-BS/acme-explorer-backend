import { commonEnvValidationObject } from '@shared/validations/common/env/common-env.validation-object';
import * as joi from 'joi';

export const validateEnv = joi.object({
  ...commonEnvValidationObject,
  SOCIAL_LOGIN_JSON_PATH: joi.string().required(),
  GOOGLE_SERVICE_ACCOUNT: joi.string().required(),
});
