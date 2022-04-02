import { BaseError } from '@common/common/errors/base-error.abstract';

/**
 * Error class used when a user is trying to get a firebase app with a name that is not registered
 *
 * @extends BaseError
 */
export class FirebaseAdminAppNotFoundError extends BaseError {
  public readonly message: string;

  constructor(appName: string) {
    super();

    this.message = `App with name ${appName} not found. Are you sure you registered the app?`;
  }
}
