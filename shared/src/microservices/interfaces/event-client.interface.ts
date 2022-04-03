export interface EventClient {
  subscribe(
    eventPattern: any,
    callback: (...args: any[]) => Promise<any> | any,
  ): void;
  close(): Promise<void> | void;
  send(eventPattern: any, data: any): Promise<any> | any;
}
