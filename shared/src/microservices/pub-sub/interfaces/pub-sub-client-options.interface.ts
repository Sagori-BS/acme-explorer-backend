import { ClientConfig } from '@google-cloud/pubsub';
import { ILogger } from '../pub-sub-client';

export interface PubSubClientOptions {
  clientId: string;
  pubSubConfig: ClientConfig;
  topicSeeds?: string[];
  logger?: ILogger;
}
