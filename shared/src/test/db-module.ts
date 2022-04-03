import { DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryReplSet } from 'mongodb-memory-server';

class MongooseModuleTesting {
  private _instance: DynamicModule;
  private _db: MongoMemoryReplSet;

  get instance() {
    if (!this._instance) {
      throw new Error('Module not initialized');
    }

    return this._instance;
  }

  async closeConnection() {
    if (this._db) {
      await this._db.stop();
    }
  }

  async init() {
    this._db = await MongoMemoryReplSet.create({
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

    await this._db.waitUntilRunning();

    const dbUri = (await this._db.getUri()) + '&retryWrites=true';

    this._instance = MongooseModule.forRoot(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

const mongooseModuleTesting = new MongooseModuleTesting();

export { mongooseModuleTesting };
