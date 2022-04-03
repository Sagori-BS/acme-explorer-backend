import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FIREBASE_ADMIN_CONFIG_TOKEN } from './constants/firebase-admin.constants';

/**
 * Nestjs injectable service class that wraps the admin package from firebase
 *
 * @see https://firebase.google.com/docs/reference/admin
 */
@Injectable()
export class FirebaseAdminService {
  constructor(
    @Inject(FIREBASE_ADMIN_CONFIG_TOKEN)
    private readonly config: admin.AppOptions,
  ) {
    admin.initializeApp(config);
  }

  /**
   * @property {admin.auth.Auth} auth getter for the auth module of the firebase admin sdk
   *
   * @see https://firebase.google.com/docs/reference/admin/node/admin.auth
   */
  get auth(): admin.auth.Auth {
    return admin.auth();
  }

  /**
   * @property {admin.messaging.Messaging} messaging getter for the messaging module of the firebase admin sdk
   *
   * @see https://firebase.google.com/docs/reference/admin/node/admin.messaging
   */
  get messaging(): admin.messaging.Messaging {
    return admin.messaging();
  }

  /**
   * @property {admin.storage.Storage} auth getter for the storage module of the firebase admin sdk
   *
   * @see https://firebase.google.com/docs/reference/admin/node/admin.storage
   */
  get storage(): admin.storage.Storage {
    return admin.storage();
  }
}
