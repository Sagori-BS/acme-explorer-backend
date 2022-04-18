import { Model, Types } from 'mongoose';
import { initializeCommonRepositoryTests } from '@shared/test/initialize-common-repository-test';
import { User, UserSchema } from '../database/user.entity';
import { CreatedUserPayload } from '@shared/events/user/user.payload';
import { UserRepository } from '../user.repository';
import * as faker from 'faker';
import { EntityNotFoundError } from '@shared/errors/common/entity-not-found.error';
import { CommonRepositoryTests } from '@shared/test/common-repository-tests';

const entityName = User.name;

describe(`${entityName} Repository`, () => {
  let entityModel: Model<User>;
  let commonRepositoryTests: CommonRepositoryTests;
  let entityRepository: any;

  const createEntityInput: CreatedUserPayload = {
    id: new Types.ObjectId().toHexString(),
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email()
  };

  const updateEntityPayload: any = {
    name: faker.name.firstName()
  };

  const createUserSetup = async () => {
    const user = new entityModel({
      ...createEntityInput,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    });

    return user.save();
  };

  beforeAll(async () => {
    const config = await initializeCommonRepositoryTests({
      Entity: User,
      EntitySchema: UserSchema,
      EntityRepository: UserRepository,
      createEntityInput
    });

    entityModel = config.entityModel;
    entityRepository = config.entityRepository;
    commonRepositoryTests = config.commonRepositoryTests;
  });

  afterEach(async () => {
    return entityModel.deleteMany({});
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

  describe(`list${entityName}s`, () => {
    it(`should return one element and count one if there is one ${entityName} entity stored in the database`, async () => {
      await commonRepositoryTests.listEntities();
    });
  });

  describe(`create${entityName}`, () => {
    it(`should create an ${entityName} entity given a valid input`, async () => {
      // Arrange
      const expectedValue = { ...createEntityInput };

      // Act
      const result = await entityRepository.createEntity(createEntityInput);

      // Assert
      expect(result.toObject()).toMatchObject(expectedValue);
    });
  });

  describe(`update${entityName}`, () => {
    it(`should throw an error if an id of a not existing ${entityName} entity is provided`, async () => {
      const entity = await createUserSetup();

      const updateEntityInput = {
        where: { id: entity.id, version: 1 },
        data: updateEntityPayload
      };

      const result = entityRepository.updateEntity(updateEntityInput);
      await expect(result).rejects.toThrow(EntityNotFoundError);
    });

    it(`should update the ${entityName} entity that match the given id, if valid fields are provided`, async () => {
      const entity = await createUserSetup();

      const updateEntityInput = {
        where: { id: entity.id, version: entity.version },
        data: updateEntityPayload
      };

      const result = await entityRepository.updateEntity(updateEntityInput);

      expect(entity.toObject()).not.toMatchObject(updateEntityPayload);
      expect(result).toMatchObject(updateEntityPayload);
    });
  });

  describe(`delete${entityName}`, () => {
    it(`should throw an error if an id of a non-existing ${entityName} entity is provided`, async () => {
      const entity = await createUserSetup();

      const result = entityRepository.deleteEntity({
        id: entity.id,
        version: 2
      });

      await expect(result).rejects.toThrow(EntityNotFoundError);
    });

    it(`should mark as deleted the ${entityName} entity that match with the given id`, async () => {
      const entity = await createUserSetup();

      const result = await entityRepository.deleteEntity({
        id: entity.id,
        version: entity.version
      });

      expect(result.deleted).toBe(true);
    });
  });
});
