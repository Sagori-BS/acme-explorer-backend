import { Test } from '@nestjs/testing';
import { UserRepository } from '../user.repository';
import { UserService } from '../user.service';
import { Types } from 'mongoose';
import { CreateUserInput } from '../graphql/inputs/create-user.input';
import { UserRoles } from '@common/common/auth/enums/user-roles.enum';
import { AuthProviders, AuthType } from '../../auth/utils/auth-providers.enum';
import { FilterInput } from '@common/common/graphql/inputs/graphql-filter.input';
import { UpdateUserInput } from '../graphql/inputs/update-user.input';
import { User } from '../database/user.entity';
import * as faker from 'faker';
import { GetUserByEmailDto } from '../dto/get-user-by-email.dto';

const userMock = {
  id: new Types.ObjectId().toHexString(),
  name: faker.name.firstName(),
  version: 0,
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  deviceTokens: [faker.lorem.sentence()],
  roles: [new Types.ObjectId().toHexString()]
};

const userRepository = {
  getAllEntities: jest.fn().mockReturnValue([userMock]),
  createEntity: jest.fn().mockReturnValue(userMock),
  updateEntity: jest.fn().mockReturnValue(userMock),
  deleteEntity: jest.fn().mockReturnValue(userMock),
  getOneEntity: jest.fn().mockReturnValue(userMock)
};

const entityName = User.name;

describe(`${entityName}Service`, () => {
  let userService: UserService;

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: userRepository
        }
      ]
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
        start: 35
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
        start: 35
      };

      //Act
      await userService.getEntities(filterInput);

      //Assert
      expect(userRepository.getAllEntities).toHaveBeenCalled();
      expect(userRepository.getAllEntities).toHaveBeenCalledWith({
        limit: 5,
        start: 35,
        where: { deleted: false }
      });
    });
  });

  describe(`create${entityName}`, () => {
    it(`should call the create${entityName} method from the user repository`, async () => {
      //Arrange
      const createUserInput: CreateUserInput = {
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: faker.internet.password(),
        roles: [UserRoles.ADMIN],
        email: faker.internet.email(),
        socialProvider: AuthProviders.Local,
        authType: AuthType.PASSWORD
      };

      //Act
      await userService.createEntity(createUserInput);

      //Assert
      expect(userRepository.createEntity).toHaveBeenCalled();
      expect(userRepository.createEntity).toHaveBeenCalledWith(createUserInput);
    });
  });

  describe(`update${entityName}`, () => {
    it(`should call the update${entityName} method of the userRepository`, async () => {
      //Arrange
      const updateUserInput: UpdateUserInput = {
        where: {
          id: userMock.id
        },
        data: {
          roles: [UserRoles.ADMIN]
        }
      };

      //Act
      await userService.updateEntity(updateUserInput);

      //Assert
      expect(userRepository.updateEntity).toHaveBeenCalled();
      expect(userRepository.updateEntity).toHaveBeenCalledWith(updateUserInput);
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
        deleted: false
      });
    });
  });

  describe('verifyUserEmail', () => {
    it('should call the getAllEntities method of the userRepository', async () => {
      //Arrange
      const input: GetUserByEmailDto = {
        email: faker.internet.email()
      };

      userRepository.getAllEntities.mockReturnValueOnce([]);

      const expectedInput = {
        where: {
          email: input.email,
          deleted: false
        },
        limit: 1
      };

      //Act
      await userService.verifyUserEmail(input);

      //Assert
      expect(userRepository.getAllEntities).toHaveBeenCalled();
      expect(userRepository.getAllEntities).toHaveBeenCalledWith(expectedInput);
    });

    it('should return false when the user is not found in the db', async () => {
      //Arrange
      const input: GetUserByEmailDto = {
        email: faker.internet.email()
      };

      userRepository.getAllEntities.mockReturnValueOnce([]);

      //Act
      const res = await userService.verifyUserEmail(input);

      //Assert
      expect(res).toBe(false);
    });

    it('should return true when the user is found in the db', async () => {
      //Arrange
      const input: GetUserByEmailDto = {
        email: userMock.email
      };

      //Act
      const res = await userService.verifyUserEmail(input);

      //Assert
      expect(res).toBe(true);
    });
  });
});
