import { ClientConfig } from '@google-cloud/pubsub';

/**
 * @property {boolean} isGlobal Defaults to false, if true the module will be globally avaliable in the current app
 *
 * @property {string} serviceName The name used to register the app to a pub-sub topic
 *
 * @property {ClientConfig} pubSubClientConfig The pub-sub client configuration for this app
 */
export interface IPubSubClientModuleOptions {
  isGlobal?: boolean;
  serviceName: string;
  topicSeeds?: string[];
  pubSubClientConfig: ClientConfig;
}
