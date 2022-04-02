import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import {
  DEFAULT_FIREBASE_APP_NAME,
  FirebaseAdminAppConfigOptions,
  FIREBASE_ADMIN_CONFIG_TOKEN,
  InvalidFirebaseAdminModuleConfigurationError,
  FirebaseAdminAppNotFoundError
} from '.';

/**
 * Nestjs injectable service class that wraps the admin package from firebase
 *
 * @see https://firebase.google.com/docs/reference/admin
 */
@Injectable()
export class FirebaseAdminService {
  private registeredApps: Map<string, admin.app.App> = new Map();
  readonly registeredAppNames: string[];

  constructor(
    @Inject(FIREBASE_ADMIN_CONFIG_TOKEN)
    private readonly appConfigs: FirebaseAdminAppConfigOptions[]
  ) {
    this.registerAllApps();

    this.registeredAppNames = Array.from(this.registeredApps.keys());
  }

  private registerAllApps() {
    if (this.appConfigs.length === 0) {
      throw new InvalidFirebaseAdminModuleConfigurationError();
    }

    this.appConfigs.forEach((appConfig, idx) => {
      if (idx === 0) {
        this.registerApp({
          appName: DEFAULT_FIREBASE_APP_NAME,
          options: appConfig.options
        });
      }

      this.registerApp(appConfig);
    });
  }

  private registerApp(appConfig: FirebaseAdminAppConfigOptions): admin.app.App {
    const { appName, options } = appConfig;

    const app = admin.initializeApp(options, appName);

    this.registeredApps.set(appName, app);

    return app;
  }

  private getRegisteredApp(appName: string): admin.app.App {
    const app = this.registeredApps.get(appName);

    if (!app) {
      throw new FirebaseAdminAppNotFoundError(appName);
    }

    return app;
  }

  /**
   * @method {admin.auth.Auth} method used to get the auth module of the firebase admin sdk
   * @param {string} appName the name of the app to get the auth module for. If not provided, the default app is used
   *
   * @returns {admin.auth.Auth} the auth module of the firebase admin sdk
   *
   * @see https://firebase.google.com/docs/reference/admin/node/admin.auth
   */
  public auth(appName = DEFAULT_FIREBASE_APP_NAME): admin.auth.Auth {
    return this.getRegisteredApp(appName).auth();
  }

  /**
   * @method {admin.messaging.Messaging} method used to get the messaging module of the firebase admin sdk
   * @param {string} appName the name of the app to get the auth module for. If not provided, the default app is used
   *
   * @returns {admin.messaging.Messaging} the messaging module of the firebase admin sdk
   *
   * @see https://firebase.google.com/docs/reference/admin/node/admin.messaging
   */
  public messaging(
    appName = DEFAULT_FIREBASE_APP_NAME
  ): admin.messaging.Messaging {
    return this.getRegisteredApp(appName).messaging();
  }

  /**
   * @method {admin.storage.Storage} method used to get the storage module of the firebase admin sdk
   * @param {string} appName the name of the app to get the auth module for. If not provided, the default app is used
   *
   * @returns {admin.storage.Storage} the storage module of the firebase admin sdk
   *
   * @see https://firebase.google.com/docs/reference/admin/node/admin.storage
   */
  public storage(appName = DEFAULT_FIREBASE_APP_NAME): admin.storage.Storage {
    return this.getRegisteredApp(appName).storage();
  }
}
