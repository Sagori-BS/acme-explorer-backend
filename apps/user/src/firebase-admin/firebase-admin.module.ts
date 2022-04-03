import { DynamicModule, Module } from '@nestjs/common';
import { FirebaseAdminService } from './firebase-admin.service';
import { FIREBASE_ADMIN_CONFIG_TOKEN } from './constants/firebase-admin.constants';
import { FirebaseAdminModuleOptions } from './interfaces/firebase-admin-module-options.interface';
import { FirebaseAdminModuleAsyncOptions } from './interfaces/firebase-admin-module-async-options.interface';

/**
 *
 * Custom Nestjs module that initializes an instance of the firebase admin sdk
 *
 * @see https://firebase.google.com/docs/reference/admin
 *
 */
@Module({})
export class FirebaseAdminModule {
  static register(options: FirebaseAdminModuleOptions): DynamicModule {
    const { isGlobal = false, adminOptions = {} } = options;

    return {
      global: isGlobal,
      module: FirebaseAdminModule,
      imports: [],
      providers: [
        {
          provide: FIREBASE_ADMIN_CONFIG_TOKEN,
          useValue: adminOptions,
        },
        FirebaseAdminService,
      ],
      exports: [FirebaseAdminService],
    };
  }

  static registerAsync(
    options: FirebaseAdminModuleAsyncOptions,
  ): DynamicModule {
    const { isGlobal = false, useFactory, inject = [] } = options;

    return {
      global: isGlobal,
      module: FirebaseAdminModule,
      imports: [],
      providers: [
        {
          provide: FIREBASE_ADMIN_CONFIG_TOKEN,
          useFactory: useFactory,
          inject: inject,
        },
        FirebaseAdminService,
      ],
      exports: [FirebaseAdminService],
    };
  }
}
