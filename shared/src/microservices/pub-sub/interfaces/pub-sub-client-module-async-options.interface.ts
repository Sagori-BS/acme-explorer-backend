import { PubSubClientOptions } from './pub-sub-client-options.interface';

export interface IPubSubClientModuleAsyncOptions {
  isGlobal?: boolean;
  useFactory: (
    ...args: any[]
  ) => Promise<PubSubClientOptions> | PubSubClientOptions;
  inject?: any[];
}
