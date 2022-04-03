import { MongoMemoryReplSet } from 'mongodb-memory-server';

//TODO: Verify how to setup the test environment using this
export = async function globalTeardown() {
  const instance: MongoMemoryReplSet = (global as any)._MONGOINSTANCE;

  await instance.stop();
};
