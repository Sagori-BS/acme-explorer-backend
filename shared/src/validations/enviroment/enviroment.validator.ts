import { Environment } from '@shared/data/enums/environment.enum';
import * as joi from 'joi';

export const validateEnviromentWithJoi = joi
  .string()
  .valid(...Object.values(Environment));
