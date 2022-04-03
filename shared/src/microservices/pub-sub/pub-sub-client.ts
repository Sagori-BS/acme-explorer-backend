import { Message, PubSub, Subscription, Topic } from '@google-cloud/pubsub';
import * as rx from 'rxjs';
import { EventClient } from '../interfaces/event-client.interface';
import { PubSubClientOptions } from './interfaces/pub-sub-client-options.interface';
import { normalizePubSubResourceName } from './utils/normalize-pub-sub-resource-name.util';

export interface ILogger {
  log: (message: string) => void;
  error: (message: string) => void;
  warn: (message: string) => void;
  debug: (message: string) => void;
}

export class PubSubClient implements EventClient {
  private readonly client: PubSub;
  private readonly clientId: string;
  private readonly logger: ILogger;
  private readonly topicSeeds: string[];

  constructor(options: PubSubClientOptions) {
    const {
      clientId,
      pubSubConfig = {},
      logger = console,
      topicSeeds,
    } = options;

    this.client = new PubSub(pubSubConfig);
    this.clientId = clientId;
    this.logger = logger;
    this.topicSeeds = topicSeeds ?? [];
  }

  /**
   * Closes all the current open subscriptions
   *
   *  @returns {Promise}
   */
  public async close(): Promise<void> {
    await this.client.closeAllClients_();
  }

  /**
   * Suscribes the current instance of the client to the topic matching the provided pattern and uses the provided callback when a new message is avaliable.
   *
   * It automatically creates the subscription with the provided pattern if no matching one already exists.
   *
   * @returns {Promise}
   */
  public async subscribe(
    eventPattern: any,
    callback: (...args: any[]) => Promise<any>,
  ): Promise<void> {
    const [topic] = await this._getTopic(eventPattern);

    const subscription = await this._getSubscription(
      topic,
      this._normalizeSubscriptionName(eventPattern),
    );

    subscription.on(
      'message',
      async (message: Message) =>
        await this._subscriptionHandler(message, callback),
    );
  }

  private async _subscriptionHandler(
    message: Message,
    callback: (...args: any[]) => Promise<any>,
  ): Promise<void> {
    try {
      this.logger.log(`Received Message with data ${message.data.toString()}`);

      const res = await callback(JSON.parse(message.data.toString()));

      await this._callbacktoPromise(res);

      message.ack();
    } catch (error) {
      this.logger.log(
        `Failed to process Message with data ${message.data.toString()}`,
      );
    }
  }

  private async _callbacktoPromise(value: any): Promise<any> {
    if (value instanceof rx.Observable) {
      return await rx.from(value).toPromise();
    }

    return value;
  }

  /**
   * Sends the provided data to the pub-sub topic matching the provided eventPattern
   *
   * @param eventPattern
   *
   * @param data
   *
   * @returns {Promise<void>}
   */
  public async send(eventPattern: any, data: any): Promise<boolean> {
    try {
      const [topic] = await this._getTopic(JSON.stringify(eventPattern));

      await topic.publishJSON(data);

      return true;
    } catch (error) {
      this.logger.log(error);
      return false;
    }
  }

  /**
   * It returns a pub-sub topic and its normalized pattern
   * by providing the event pattern.
   * If no matching pub-sub topic is found, a new one will be created.
   *
   * @param {string} eventPattern
   *
   * @returns {[Topic,string]}
   */
  private async _getTopic(eventPattern: string): Promise<[Topic, string]> {
    const topicName = this._normalizeTopicName(eventPattern);

    const topic = this.client.topic(topicName);

    const [existTopic] = await topic.exists();

    if (!existTopic) {
      await topic.create();
    }

    return [topic, topicName];
  }

  /**
   * It returns a pub-sub subscription by providing the event pattern.
   * If no matching pub-sub subscription is found, a new one will be created.
   *
   * @param eventPattern
   *
   * @returns {Subscription}
   */
  private async _getSubscription(
    topic: Topic,
    subscriptionName: string,
  ): Promise<Subscription> {
    const subscription = topic.subscription(subscriptionName);

    const [existSubscription] = await subscription.exists();

    if (!existSubscription) {
      await subscription.create();
    }

    return subscription;
  }

  /**
   * Given an eventPattern it returns its stringified version to be used as topic name
   *
   * @param {string} eventPattern
   *
   * @returns {string}
   */
  private _normalizeTopicName(eventPattern: string): string {
    const normalizedPattern = normalizePubSubResourceName(eventPattern, [
      ...this.topicSeeds,
    ]);

    return normalizedPattern;
  }

  /**
   * Given an eventPattern it returns its stringified version to be used as subscription name
   *
   * @param {string} eventPattern
   *
   * @returns {string}
   */
  private _normalizeSubscriptionName(eventPattern: string): string {
    const normalizedPattern = normalizePubSubResourceName(eventPattern, [
      ...this.topicSeeds,
      this.clientId,
    ]);

    return normalizedPattern;
  }
}
