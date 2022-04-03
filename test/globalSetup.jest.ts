import { MongoMemoryReplSet } from 'mongodb-memory-server';

//TODO: Verify how to setup the test environment using this
export = async function globalSetup() {
  const instance = await MongoMemoryReplSet.create({
    replSet: { count: 1, storageEngine: 'wiredTiger' },
    binary: {
      version: '4.4.8',
      os: {
        os: 'linux',
        dist: 'Ubuntu Linux',
        release: '20.04',
      },
    },
  });

  await instance.waitUntilRunning();

  (global as any)._MONGOINSTANCE = instance;

  process.env.MONGO_TESTING_URI =
    (await instance.getUri()) + '&retryWrites=false';
};
