import * as joi from 'joi';

export const validateEnv = joi.object({
  PORT: joi.number().default(3000),
  APOLLO_KEY: joi.string().required(),
  GRAPH_VARIANT: joi.string().required(),
  ALLOW_HOST_HEADER: joi.bool().required(),
});
