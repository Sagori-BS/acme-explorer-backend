import { FirebaseAdminAppConfigOptions } from './fireabase-admin-app-config.interface';

/**
 * Interface that describes the configuration object to initialize the firebase admin module
 */
export interface FirebaseAdminModuleOptions {
  /**
   * @property {boolean} isGlobal Determines if the firebase admin module is globally avaliable to all the modules or not.
   *
   * @default false
   */
  isGlobal?: boolean;

  /**
   * @property {FirebaseAdminAppConfigOptions[]} appsConfig Configuration object for the firebase admin sdk. Defaults to []
   *
   * @default []
   */
  appsConfig?: FirebaseAdminAppConfigOptions[];
}
