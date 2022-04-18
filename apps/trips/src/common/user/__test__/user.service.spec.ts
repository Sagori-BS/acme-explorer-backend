import {
  CreatedUserPayload,
  UpdatedUserPayload
} from '@shared/events/user/user.payload';
import { CommonServiceTests } from '@shared/test/common-service-tests';
import { initializeCommonServiceTests } from '@shared/test/initialize-common-service-test';
import { Types } from 'mongoose';
import { User } from '../database/user.entity';
import { UserRepository } from '../user.repository';
import { UserService } from '../user.service';
import * as faker from 'faker';

const entityName = User.name;
describe(`${entityName}Service`, () => {
  let commonServiceTests: CommonServiceTests;
  let entityService: UserService;
  let entityRepository: jest.Mocked<UserRepository>;

  const createEntityInput: CreatedUserPayload = {
    id: new Types.ObjectId().toHexString(),
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email()
  };

  const payload = {
    id: new Types.ObjectId().toHexString(),
    version: 0,
    deleted: false
  };

  const updateEntityPayload: UpdatedUserPayload = {
    where: {
      ...payload
    },
    data: {
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      profilePicture: faker.image.imageUrl()
    }
  };

  beforeAll(async () => {
    const config = await initializeCommonServiceTests({
      EntityService: UserService,
      EntityRepository: UserRepository
    });
    commonServiceTests = config.commonServiceTests;
    entityService = config.entityService;
    entityRepository = commonServiceTests.entityRepository;
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

  describe(`list${entityName}s`, () => {
    it(`should call the listEntities method of the ${entityName}Repository`, async () => {
      await commonServiceTests.listEntities();
    });
  });

  describe(`create${entityName}`, () => {
    it(`should call the createEntity method of the ${entityName}Repository`, async () => {
      entityRepository.createEntity.mockReturnValueOnce({
        id: new Types.ObjectId().toHexString()
      } as any);

      await commonServiceTests.createEntity(createEntityInput);
    });
  });

  describe(`update${entityName}`, () => {
    it(`should call the updateEntity method of the ${entityName}Repository`, async () => {
      //Arrange and Act
      await entityService.updateEntity(updateEntityPayload);

      //Assert
      expect(entityRepository.updateEntity).toHaveBeenCalled();
      expect(entityRepository.updateEntity).toHaveBeenCalledWith(
        updateEntityPayload
      );
    });
  });

  describe(`delete${entityName}`, () => {
    it(`should call the deleteEntity method of the ${entityName}Repository`, async () => {
      //Arrange and Act
      await entityService.deleteEntity(payload);

      //Assert
      expect(entityRepository.deleteEntity).toHaveBeenCalled();
      expect(entityRepository.deleteEntity).toHaveBeenCalledWith(payload);
    });
  });
});
