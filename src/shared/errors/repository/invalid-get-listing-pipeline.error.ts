import { Env } from '@common/common/config/env.enum';
import { BaseError } from '../base-error.abstract';

export class InvalidGetListingPipelineError extends BaseError {
  public message = 'getListingPipeline is not available in the model';

  constructor() {
    super();
    Object.setPrototypeOf(this, InvalidGetListingPipelineError.prototype);

    const isProdEnv = process.env.NODE_ENV === Env.PRODUCTION;
    this.message = isProdEnv
      ? super.message
      : `getListingPipeline is not available in the model'`;
  }
}
