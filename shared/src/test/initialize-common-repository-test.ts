import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import { LoggerService } from '../logger/logger.service';
import { loggerService } from '../logger/mock/logger.service';
import { CommonRepositoryTests } from './common-repository-tests';
import { mongooseModuleTesting } from './db-module';
import { RepositoryTestConfigType } from './types/repository-test-config.type';

export const initializeCommonRepositoryTests = async (
  config: RepositoryTestConfigType,
) => {
  const {
    EntityRepository,
    Entity,
    EntitySchema,
    createEntityInput,
    imports = [],
    providers = [],
    mongooseModels = [],
    createDocument,
  } = config;

  const testModule = await Test.createTestingModule({
    imports: [
      mongooseModuleTesting.instance,
      MongooseModule.forFeature([
        {
          name: Entity.name,
          schema: EntitySchema,
        },
        ...mongooseModels,
      ]),
      ...imports,
    ],
    exports: [
      {
        provide: LoggerService,
        useValue: loggerService,
      },
    ],
    providers: [
      EntityRepository,
      {
        provide: LoggerService,
        useValue: loggerService,
      },
      ...providers,
    ],
  }).compile();

  const entityRepository = testModule.get<typeof EntityRepository>(
    EntityRepository,
  );

  const entityModel = testModule.get<Model<typeof Entity>>(
    getModelToken(Entity.name),
  );

  const mongooseTestModels: Record<string, Model<any>> = {};

  for (const mongooseModel of mongooseModels) {
    mongooseTestModels[mongooseModel.name] = testModule.get(
      getModelToken(mongooseModel.name),
    );
  }

  const commonRepositoryTests = new CommonRepositoryTests(
    entityRepository,
    entityModel,
    createEntityInput,
    createDocument,
  );

  return {
    entityModel,
    entityRepository,
    commonRepositoryTests,
    testModule,
    mongooseTestModels,
  };
};
