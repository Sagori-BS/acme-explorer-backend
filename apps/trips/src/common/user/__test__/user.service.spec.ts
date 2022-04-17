import {
  CreatedUserPayload,
  UpdatedUserPayload
} from '@common/common/events/user/user.payload';
import { CommonServiceTests } from '@common/common/test/common-service-tests';
import { initializeCommonServiceTests } from '@common/common/test/initialize-common-service-test';
import { Types } from 'mongoose';
import { User } from '../database/user.entity';
import { UserRepository } from '../user.repository';
import { UserService } from '../user.service';
import * as faker from 'faker';
import { DEFAULT_LANGUAGE_OPTIONS_DTO } from '@common/common/language/dtos/request-language-options.dto';
import { InspectorCommissionService } from '../../inspector-commission/inspector-commission.service';
import { InspectorGoalService } from '@inspection/common/inspector-goal/inspector-goal.service';
import { generateRole } from '@common/common/test/utils/generate-role';

const entityName = User.name;
describe(`${entityName}Service`, () => {
  let commonServiceTests: CommonServiceTests;
  let entityService: UserService;
  let entityRepository: jest.Mocked<UserRepository>;

  const createEntityInput: CreatedUserPayload = {
    id: new Types.ObjectId().toHexString(),
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    deviceTokens: [],
    roles: [generateRole()]
  };

  const inspectorGoalService = {
    createEntity: jest.fn()
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
      deviceTokens: [],
      roles: [generateRole()],
      address: faker.address.streetAddress(),
      telephoneNumber: faker.phone.phoneNumber(),
      profilePicture: faker.image.imageUrl(),
      documentId: faker.datatype.string(11),
      drivingLicense: faker.datatype.string(11)
    }
  };

  const inspectorCommisionService = {
    createEntity: jest.fn()
  };

  beforeAll(async () => {
    const config = await initializeCommonServiceTests({
      EntityService: UserService,
      EntityRepository: UserRepository,
      providers: [
        {
          provide: InspectorCommissionService,
          useValue: inspectorCommisionService
        },
        {
          provide: InspectorGoalService,
          useValue: inspectorGoalService
        }
      ]
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

    it(`should call the createEntity method of the inspectorCommisionService`, async () => {
      const userMock = {
        id: new Types.ObjectId().toHexString()
      } as any;
      entityRepository.createEntity.mockReturnValueOnce(userMock);

      await commonServiceTests.createEntity(createEntityInput);

      expect(inspectorCommisionService.createEntity).toHaveBeenCalled();
      expect(inspectorCommisionService.createEntity).toHaveBeenCalledWith({
        inspector: userMock.id,
        amount: 0
      });
    });

    it(`should call the createEntity method of the inspectorGoalService`, async () => {
      const userMock = {
        id: new Types.ObjectId().toHexString()
      } as any;
      entityRepository.createEntity.mockReturnValueOnce(userMock);

      await commonServiceTests.createEntity(createEntityInput);

      expect(inspectorGoalService.createEntity).toHaveBeenCalled();
      expect(inspectorGoalService.createEntity).toHaveBeenCalledWith({
        inspector: createEntityInput.id,
        inspections: 6
      });
    });
  });

  describe(`update${entityName}`, () => {
    it(`should call the updateEntity method of the ${entityName}Repository`, async () => {
      //Arrange and Act
      await entityService.updateEntity(updateEntityPayload);

      //Assert
      expect(entityRepository.updateEntity).toHaveBeenCalled();
      expect(entityRepository.updateEntity).toHaveBeenCalledWith(
        updateEntityPayload,
        DEFAULT_LANGUAGE_OPTIONS_DTO
      );
    });
  });

  describe(`delete${entityName}`, () => {
    it(`should call the deleteEntity method of the ${entityName}Repository`, async () => {
      //Arrange and Act
      await entityService.deleteEntity(payload);

      //Assert
      expect(entityRepository.deleteEntity).toHaveBeenCalled();
      expect(entityRepository.deleteEntity).toHaveBeenCalledWith(
        payload,
        DEFAULT_LANGUAGE_OPTIONS_DTO
      );
    });
  });
});
