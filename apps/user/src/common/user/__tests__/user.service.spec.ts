import { Test } from '@nestjs/testing';
import { UserRepository } from '../user.repository';
import { UserService } from '../user.service';
import { Types } from 'mongoose';
import { CreateUserInput } from '../graphql/inputs/create-user.input';
import { UserRoles } from '@shared/auth/enums/user-roles.enum';
import { AuthProviders, AuthType } from '../../auth/utils/auth-providers.enum';
import { FilterInput } from '@user/graphql/inputs/graphql-filter.input';
import { UpdateUserInput } from '../graphql/inputs/update-user.input';
import { pubSubClient } from '@shared/config/clients/mock/pub-sub-client';
import { User } from '../database/user.entity';
import { PUB_SUB_CLIENT_TOKEN } from '@shared/microservices/pub-sub/constants/pub-sub-client.constants';
import * as faker from 'faker';

const userMock = {
  id: new Types.ObjectId().toHexString(),
  name: faker.name.firstName(),
  version: 0,
  email: faker.internet.email(),
};

const userRepository = {
  getAllEntities: jest.fn(),
  createEntity: jest.fn().mockReturnValue(userMock),
  updateEntity: jest.fn().mockReturnValue(userMock),
  deleteEntity: jest.fn().mockReturnValue(userMock),
  getOneEntity: jest.fn().mockReturnValue(userMock),
};

const entityName = User.name;

describe(`${entityName}Service`, () => {
  let userService: UserService;

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PUB_SUB_CLIENT_TOKEN,
          useValue: pubSubClient,
        },
        {
          provide: UserRepository,
          useValue: userRepository,
        },
      ],
    }).compile();

    userService = testModule.get<UserService>(UserService);
  });

  describe(`getOne${entityName}`, () => {
    it(`should call the getOne${entityName} method of the userRepositor`, async () => {
      const id = new Types.ObjectId().toHexString();

      await userService.getOneEntity({ id });

      expect(userRepository.getOneEntity).toHaveBeenCalled();
      const methodCallParam = userRepository.getOneEntity.mock.calls[0][0];
      expect(methodCallParam.id).toEqual(id);
    });
  });

  describe(`getAll${entityName}s`, () => {
    it(`should call the getAll${entityName}s method of the userRepository`, async () => {
      //Arrange
      const filterInput: FilterInput = {
        limit: 5,
        start: 35,
      };

      //Act
      await userService.getEntities(filterInput);

      //Assert
      expect(userRepository.getAllEntities).toHaveBeenCalled();
      expect(userRepository.getAllEntities).toHaveBeenCalledWith(filterInput);
    });
  });

  describe(`get${entityName}s`, () => {
    it(`should call the getAll${entityName}s method of the userRepository`, async () => {
      //Arrange
      const filterInput: FilterInput = {
        limit: 5,
        start: 35,
      };

      //Act
      await userService.getEntities(filterInput);

      //Assert
      expect(userRepository.getAllEntities).toHaveBeenCalled();
      expect(userRepository.getAllEntities).toHaveBeenCalledWith({
        limit: 5,
        start: 35,
        where: { deleted: false },
      });
    });
  });

  describe(`create${entityName}`, () => {
    it(`should call the create${entityName} method from the user repository`, async () => {
      //Arrange
      const createUserInput: CreateUserInput = {
        name: faker.name.firstName(),
        password: faker.internet.password(),
        role: UserRoles.CLIENT,
        email: faker.internet.email(),
        socialProvider: AuthProviders.Local,
        authType: AuthType.PASSWORD,
      };

      //Act
      await userService.createEntity(createUserInput);

      //Assert
      expect(userRepository.createEntity).toHaveBeenCalled();
      expect(userRepository.createEntity).toHaveBeenCalledWith(createUserInput);
    });

    it('should call the send method of the client class', async () => {
      const input: CreateUserInput = {
        name: 'Test',
        role: UserRoles.CLIENT,
        password: '1234567890',
        email: 'test@test.com',
        socialProvider: AuthProviders.Local,
        authType: AuthType.PASSWORD,
      };

      await userService.createEntity(input);
      expect(pubSubClient.send).toHaveBeenCalled();
    });
  });

  describe(`update${entityName}`, () => {
    it(`should call the update${entityName} method of the userRepository`, async () => {
      //Arrange
      const updateUserInput: UpdateUserInput = {
        where: {
          id: userMock.id,
        },
        data: {
          profilePicture: faker.internet.url(),
        },
      };

      //Act
      await userService.updateEntity(updateUserInput);

      //Assert
      expect(userRepository.updateEntity).toHaveBeenCalled();
      expect(userRepository.updateEntity).toHaveBeenCalledWith(updateUserInput);
    });

    it('should call the send method of the client class', async () => {
      //Arrange
      const updateUserInput: UpdateUserInput = {
        where: {
          id: userMock.id,
        },
        data: {},
      };

      //Act
      await userService.updateEntity(updateUserInput);

      //Assert
      expect(pubSubClient.send).toHaveBeenCalled();
    });
  });

  describe(`delete${entityName}`, () => {
    it(`should call the delete${entityName} method of the userRepository`, async () => {
      //Arrange
      const id = new Types.ObjectId().toHexString();

      //Act
      await userService.deleteEntity({ id });

      //Assert
      expect(userRepository.deleteEntity).toHaveBeenCalled();
      expect(userRepository.deleteEntity).toHaveBeenCalledWith({
        id,
        deleted: false,
      });
    });

    it('should call the send method of the client class', async () => {
      //Arrange
      const id = userMock.id;

      //Act
      await userService.deleteEntity({ id });

      //Assert
      expect(pubSubClient.send).toHaveBeenCalled();
      const params = userRepository.deleteEntity.mock.calls[0];

      expect(params[0].id).toEqual(userMock.id);
    });
  });
});
