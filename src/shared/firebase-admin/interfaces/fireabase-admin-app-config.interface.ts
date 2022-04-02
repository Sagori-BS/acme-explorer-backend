import { AppOptions } from 'firebase-admin';

/**
 * Interface that describes the configuration object to initialize a firebase admin app
 */
export interface FirebaseAdminAppConfigOptions {
  /**
   * @property {string} appName Name used to identify a registered and initialized firebase app
   */
  appName: string;

  /**
   * @property {AppOptions} options Configuration object for the firebase admin sdk
   */
  options: AppOptions;
}
