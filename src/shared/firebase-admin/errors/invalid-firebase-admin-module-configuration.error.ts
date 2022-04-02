import { BaseError } from '@common/common/errors/base-error.abstract';

/**
 * Error class used when the FirebaseAdminModule is initiliazed with an empty array of FirebaseAdminAppConfigOptions
 *
 * @extends BaseError
 */
export class InvalidFirebaseAdminModuleConfigurationError extends BaseError {
  public readonly message =
    'No firebase admin app configs found. Please provide at least one.';

  constructor() {
    super();
  }
}
