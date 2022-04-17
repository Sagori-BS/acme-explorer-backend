import { Model } from 'mongoose';
import { initializeCommonRepositoryTests } from '@common/common/test/initialize-common-repository-test';
import { CommonRepositoryTests } from '@common/common/test/common-repository-tests';
import { DataStore, DataStoreSchema } from '../database/application.entity';
import { CreateDataStoreInput } from '../graphql/inputs/create-data-store.input';
import { UpdateDataStorePayload } from '../graphql/inputs/update-data-store.payload';
import { DataStoreRepository } from '../data-store.repository';
import * as faker from 'faker';
import { maxYear, minYear } from '@common/common/data/fake/number/number.fake';
import { Currency } from '@common/common/graphql/enums/currency.enum';

const entityName = DataStore.name;

describe(`${entityName} Repository`, () => {
  let entityModel: Model<DataStore>;
  let commonRepositoryTests: CommonRepositoryTests;

  const createEntityInput: CreateDataStoreInput = {
    carModel: faker.vehicle.model(),
    brand: faker.vehicle.manufacturer(),
    year: faker.datatype.number({ min: minYear, max: maxYear }),
    price: faker.datatype.number({ min: 1 }),
    mainPicture: faker.internet.url(),
    pictures: [faker.internet.url()],
    countryCode: Currency.USD
  };

  const updateEntityPayload: UpdateDataStorePayload = {
    year: faker.datatype.number({ min: minYear, max: maxYear }),
    price: faker.datatype.number({ min: 1 }),
    mainPicture: faker.internet.url()
  };

  beforeAll(async () => {
    const config = await initializeCommonRepositoryTests({
      Entity: DataStore,
      EntitySchema: DataStoreSchema,
      EntityRepository: DataStoreRepository,
      createEntityInput
    });

    entityModel = config.entityModel;
    commonRepositoryTests = config.commonRepositoryTests;
  });

  afterEach(async () => {
    await entityModel.deleteMany({});
  });

  describe(`getOne${entityName}`, () => {
    it(`should throw an error if the given id does not match any existing ${entityName} entity`, async () => {
      await commonRepositoryTests.getOneEntityError();
    });

    it(`should return the entity if the given id match an existing ${entityName} entity`, async () => {
      await commonRepositoryTests.getOneEntityById();
    });
  });

  describe(`getAll${entityName}s`, () => {
    it(`should return an empty array if there are no ${entityName}s entities stored in the database`, async () => {
      await commonRepositoryTests.getAllEntitiesError();
    });

    it(`should return an array with one element if there is one ${entityName} entity stored in the database`, async () => {
      await commonRepositoryTests.getAllEntities();
    });
  });

  describe(`create${entityName}`, () => {
    it(`should create an ${entityName} entity given a valid input`, async () => {
      await commonRepositoryTests.createEntity();
    });
  });

  describe(`update${entityName}`, () => {
    it(`should throw an error if an id of a not existing ${entityName} entity is provided`, async () => {
      await commonRepositoryTests.updateEntityError(updateEntityPayload);
    });

    it(`should update the ${entityName} entity that match the given id, if valid fields are provided`, async () => {
      await commonRepositoryTests.updateEntity(updateEntityPayload);
    });
  });

  describe(`delete${entityName}`, () => {
    it(`should throw an error if an id of a non-existing ${entityName} entity is provided`, async () => {
      await commonRepositoryTests.deleteEntityError();
    });

    it(`should mark as deleted the ${entityName} entity that match with the given id`, async () => {
      await commonRepositoryTests.deleteEntity();
    });
  });
});
