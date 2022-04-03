import * as joi from 'joi';

export const commonEnvValidationObject = {
  PORT: joi.number().default(3000),
  MONGO_DB_URI: joi.string().required(),
  GOOGLE_API_JSON_PATH: joi.string(),
  GOOGLE_PROJECT_ID: joi.string().required(),
  ACCESS_TOKEN_SECRET: joi.string().required(),
  ACCESS_TOKEN_EXPIRES_IN: joi.string().required(),
  PUB_SUB_API_ENDPOINT: joi.string().required(),
  PUB_SUB_PROJECT_ID: joi.string().required(),
  GOOGLE_LOGGER_CREDENTIAL: joi.string(),
  GOOGLE_PUB_SUB_CREDENTIAL: joi.string(),
};
