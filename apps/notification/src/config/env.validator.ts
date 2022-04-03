import { validateUrlWithJoi } from '@shared/validations/common/internet/url/url.validator';
import * as joi from 'joi';

export const validateEnv = joi.object({
  HOST_CONFIRM_EMAIL: validateUrlWithJoi.required(),
  HOST_RESET_PASSWORD: validateUrlWithJoi.required(),
  NFTS_EMAIL: joi.string().required(),
  SENGRID_USER: joi.string().required(),
  SENGRID_API_KEY: joi.string().required(),
  PUB_SUB_API_ENDPOINT: joi.string().required(),
  PUB_SUB_PROJECT_ID: joi.string().required(),
});
