import { mongooseModuleTesting } from '@shared/test/db-module';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { UserSchema, User } from '../database/user.entity';
import { Connection, Model, Types } from 'mongoose';
import { CredentialService } from '../../credential/credential.service';
import { CredentialRepository } from '../../credential/credential.repository';
import { UserRepository } from '../user.repository';
import { AuthProviders, AuthType } from '../../auth/utils/auth-providers.enum';
import { LoggerService } from '@shared/logger/logger.service';
import { loggerService } from '@shared/logger/mock/logger.service';
import { EntityNotFoundError } from '@shared/errors/common/entity-not-found.error';
import { CreateUserInput } from '../graphql/inputs/create-user.input';
import { UserRoles } from '@shared/auth/enums/user-roles.enum';
import * as faker from 'faker';

const entityName = User.name;

describe(`${entityName}Repository`, () => {
  let userRepository: UserRepository;
  let entityModel: Model<User>;

  const credentialService = {
    createCredential: jest.fn()
  };

  const credentialRepository = {
    getCredentialByIdOrEmail: jest.fn(),
    createCredential: jest.fn(),
    updateCredential: jest.fn(),
    updateCredentialPassword: jest.fn(),
    deleteCredential: jest.fn()
  };

  const connection = {
    startSession: jest.fn().mockReturnValue({
      startTransaction: jest.fn(),
      endSession: jest.fn(),
      abortTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      id: 'test'
    })
  };

  const createUser = async (email: string) => {
    const entity = new entityModel({
      name: faker.lorem.word(5),
      lastName: faker.lorem.word(5),
      email,
      socialProvider: AuthProviders.Local,
      authType: AuthType.PASSWORD,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return entity.save();
  };

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [
        mongooseModuleTesting.instance,
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: UserSchema
          }
        ])
      ],
      providers: [
        {
          provide: CredentialService,
          useValue: credentialService
        },
        {
          provide: CredentialRepository,
          useValue: credentialRepository
        },
        {
          provide: Connection,
          useValue: connection
        },
        {
          provide: LoggerService,
          useValue: loggerService
        },
        UserRepository
      ]
    }).compile();

    userRepository = testModule.get<UserRepository>(UserRepository);
    entityModel = testModule.get<Model<User>>(getModelToken(User.name));
  });

  afterEach(async () => {
    await entityModel.deleteMany({});
  });

  describe(`getOne${entityName}`, () => {
    it('should return the entity if the given id match an existing user entity', async () => {
      // Arrange
      const user = await createUser('test@test.com');

      // Act
      const result = await userRepository.getOneEntity({ id: user.id });

      // Assert
      expect(result.id).toEqual(user.id);
    });

    it('should throws an error if the user dont exist', async () => {
      const result = userRepository.getOneEntity({
        id: new Types.ObjectId().toHexString()
      });

      await expect(result).rejects.toThrow(EntityNotFoundError);
    });
  });

  describe('getAllUsers', () => {
    it(`should return an empty array if there are no ${entityName}s entities stored in the database`, async () => {
      const result = await userRepository.getAllEntities({
        where: { id: 'est' }
      });

      expect(result.length).toBe(0);
      expect(result).toEqual([]);
    });

    it(`should return an array with one element if there is one ${entityName} entity stored in the database`, async () => {
      // Arrange
      const entity = await createUser('test@test2.com');

      // Act
      const result = await userRepository.getAllEntities({
        where: { id: entity.id }
      });

      // Assert
      expect(result.length).toEqual(1);
      expect(result[0].id).toEqual(entity.id);
    });
  });

  describe(`delete${entityName}`, () => {
    it(`should throw an error if an id of a non-existing ${entityName} entity is provided`, async () => {
      // Arrange
      const id = new Types.ObjectId().toHexString();

      // Act
      const result = userRepository.deleteEntity({ id });

      // Assert
      await expect(result).rejects.toThrow(EntityNotFoundError);
    });

    it(`should mark as deleted the ${entityName} entity that match with the given id`, async () => {
      // Arrange
      const entity = await createUser('test@test3.com');

      // Act
      const result = await userRepository.deleteEntity({
        id: entity.id
      });

      // Assert
      expect(result.deleted).toBe(true);
    });
  });

  describe(`create${entityName}`, () => {
    it(`should create an ${entityName} entity given a valid input`, async () => {
      // Arrange
      const createEntityInput: CreateUserInput = {
        email: faker.internet.email().toLowerCase(),
        name: faker.lorem.word(6),
        lastName: faker.lorem.word(5),
        password: faker.lorem.word(8),
        socialProvider: AuthProviders.Local,
        authType: AuthType.PASSWORD,
        role: UserRoles.EXPLORER
      };

      // Act
      const result = await userRepository.createEntity(createEntityInput);

      const expectedValue = {
        ...result.toObject()
      };

      // Assert
      expect(expectedValue).toMatchObject(createEntityInput);
      expect(credentialService.createCredential).toHaveBeenCalled();
    });
  });

  describe(`update${entityName}`, () => {
    it(`should throw an error if an id of a not existing ${entityName} entity is provided`, async () => {
      // Arrange
      const id = new Types.ObjectId().toHexString();
      const input = { name: 'test2' };

      const updateEntityInput = {
        where: { id },
        data: input
      };

      // Act
      const result = userRepository.updateEntity(updateEntityInput);

      // Assert
      await expect(result).rejects.toThrow(EntityNotFoundError);
    });

    it(`should update the ${entityName} entity that match the given id, if valid fields are provided`, async () => {
      // Arrange
      const entity = await createUser('test@test34.com');

      const input = { name: 'test2' };

      const updateEntityInput = {
        where: { id: entity.id },
        data: input
      };

      // Act
      const result = await userRepository.updateEntity(updateEntityInput);

      // Assert
      expect(entity).not.toMatchObject(input);
      expect(result).toMatchObject(input);
    });
  });
});
