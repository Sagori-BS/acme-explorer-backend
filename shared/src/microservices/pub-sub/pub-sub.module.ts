import { DynamicModule, Module } from '@nestjs/common';
import {
  PUB_SUB_CLIENT_CONFIG_TOKEN,
  PUB_SUB_CLIENT_TOKEN,
} from './constants/pub-sub-client.constants';
import { IPubSubClientModuleAsyncOptions } from './interfaces/pub-sub-client-module-async-options.interface';
import { IPubSubClientModuleOptions } from './interfaces/pub-sub-client-module-configuration.interface';
import { PubSubClientOptions } from './interfaces/pub-sub-client-options.interface';
import { PubSubClient } from './pub-sub-client';

/**
 * A custom nestjs module that encapsules a custom pub-sub client
 *
 * @example <caption>Create an instance of the PubSubClientModule</caption>
 *
 *  PubSubClientModule.register({
 *  isGlobal: true,
 *  serviceName: 'user',
 *  pubSubClientConfig: {
 *      projectId: 'pubsubtest-312200',
 *      port: 8085,
 *      apiEndpoint: 'http://pubsub-emulator:8085/',
 *      },
 *   }),
 */
@Module({})
export class PubSubClientModule {
  /**
   * Creates an instance of the PubSubClientModule
   *
   * @param {IPubSubClientModuleOptions} options
   *
   * @returns {DynamicModule}
   */
  static register(options: IPubSubClientModuleOptions): DynamicModule {
    const {
      isGlobal = false,
      serviceName,
      pubSubClientConfig = {},
      topicSeeds = [],
    } = options;

    return {
      global: isGlobal,
      module: PubSubClientModule,
      providers: [
        {
          provide: PUB_SUB_CLIENT_TOKEN,
          useValue: new PubSubClient({
            topicSeeds,
            clientId: serviceName,
            pubSubConfig: pubSubClientConfig,
          }),
        },
      ],
      exports: [PUB_SUB_CLIENT_TOKEN],
    };
  }

  static registerAsync(
    options: IPubSubClientModuleAsyncOptions,
  ): DynamicModule {
    const { isGlobal = false, useFactory, inject = [] } = options;

    return {
      global: isGlobal,
      module: PubSubClientModule,
      imports: [],
      providers: [
        {
          provide: PUB_SUB_CLIENT_CONFIG_TOKEN,
          useFactory: useFactory,
          inject: inject,
        },
        {
          provide: PUB_SUB_CLIENT_TOKEN,
          inject: [PUB_SUB_CLIENT_CONFIG_TOKEN],
          useFactory: (options: PubSubClientOptions) => {
            return new PubSubClient(options);
          },
        },
      ],
      exports: [PUB_SUB_CLIENT_TOKEN],
    };
  }
}
