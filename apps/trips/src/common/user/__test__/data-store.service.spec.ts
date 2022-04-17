import { CommonServiceTests } from '@common/common/test/common-service-tests';
import { initializeCommonServiceTests } from '@common/common/test/initialize-common-service-test';
import { DataStoreRepository } from '../data-store.repository';
import { DataStoreService } from '../data-store.service';
import { DataStore } from '../database/application.entity';
import { CreateDataStoreInput } from '../graphql/inputs/create-data-store.input';
import { UpdateDataStorePayload } from '../graphql/inputs/update-data-store.payload';
import * as faker from 'faker';
import { maxYear, minYear } from '@common/common/data/fake/number/number.fake';
import { Currency } from '@common/common/graphql/enums/currency.enum';

const entityName = DataStore.name;

describe(`${entityName}Service`, () => {
  let commonServiceTests: CommonServiceTests;

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
    year: faker.datatype.number({ min: minYear, max: maxYear })
  };

  beforeAll(async () => {
    const config = await initializeCommonServiceTests({
      EntityService: DataStoreService,
      EntityRepository: DataStoreRepository
    });
    commonServiceTests = config.commonServiceTests;
  });

  describe(`getOne${entityName}`, () => {
    it(`should call the getOneEntity method of the ${entityName}Repository`, async () => {
      await commonServiceTests.getOneEntity();
    });
  });

  describe(`getAll${entityName}s`, () => {
    it(`should call the getAllEntities method of the ${entityName}Repository`, async () => {
      await commonServiceTests.getAllEntities();
    });
  });

  describe(`get${entityName}s`, () => {
    it(`should call the getEntities method of the ${entityName}Repository`, async () => {
      await commonServiceTests.getEntities();
    });
  });

  describe(`create${entityName}`, () => {
    it(`should call the createEntity method of the ${entityName}Repository`, async () => {
      await commonServiceTests.createEntity(createEntityInput);
    });
  });

  describe(`update${entityName}`, () => {
    it(`should call the updateEntity method of the ${entityName}Repository`, async () => {
      await commonServiceTests.updateEntity(updateEntityPayload);
    });
  });

  describe(`delete${entityName}`, () => {
    it(`should call the deleteEntity method of the ${entityName}Repository`, async () => {
      await commonServiceTests.deleteEntity();
    });
  });
});
