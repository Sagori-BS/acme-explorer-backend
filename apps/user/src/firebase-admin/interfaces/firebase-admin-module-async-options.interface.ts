import * as admin from 'firebase-admin';

/**
 * Interface that describes the configuration object to initialize the firebase admin module asyncronously
 */
export interface FirebaseAdminModuleAsyncOptions {
  /**
   * @property {boolean} isGlobal Determines if the firebase admin module is globally avaliable to all the modules or not.
   *
   * @default false
   */
  isGlobal?: boolean;

  /**
   * @property {function} useFactory Function used to return a configruation object for the firebase admin sdk.
   *
   * @param args Parameters used in the function to initialize the firebase admin sdk. If any argument is provided it must be visible in the module scope.
   *
   * @returns {Promise<admin.AppOptions>|admin.AppOptions} Type of the configuration object to initialize the firebase admin sdk.
   */
  useFactory: (...args: any[]) => Promise<admin.AppOptions> | admin.AppOptions;

  /**
   * @property {any[]} inject List of the providers needed to initialize the firebase admin module asyncronously.
   *
   * @defaults []
   */
  inject?: any[];
}
