import * as joi from 'joi';

export const validateEnv = joi.object({
  PORT: joi.number().default(3000),
  GOOGLE_API_JSON_PATH: joi.string().required(),
  GOOGLE_PROJECT_ID: joi.string().required(),
  ACCESS_TOKEN_SECRET: joi.string().required(),
  ACCESS_TOKEN_EXPIRES_IN: joi.string().required(),
  PUB_SUB_API_ENDPOINT: joi.string().required(),
  PUB_SUB_PROJECT_ID: joi.string().required(),
  AWS_ACCESS_KEY: joi.string().required(),
  AWS_SECRET_KEY: joi.string().required(),
  AWS_REGION: joi.string().required(),
  BUCKET_NAME: joi.string().required(),
  SPACE_ENDPOINT: joi.string().required()
});
