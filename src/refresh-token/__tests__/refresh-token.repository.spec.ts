import { Model } from 'mongoose';
import { RefreshTokenRepository } from '../refresh-token.repository';
import {
  RefreshToken,
  RefreshTokenSchema
} from '../database/refresh-token.entity';
import { Types } from 'mongoose';
import { CreateRefreshTokenInput } from '../graphql/inputs/create-refresh-token.input';
import { User, UserSchema } from '../../user/database/user.entity';
import { initializeCommonRepositoryTests } from '@common/common/test/initialize-common-repository-test';
import { AuthProviders, AuthType } from '../../auth/utils/auth-providers.enum';
import { CommonRepositoryTests } from '@common/common/test/common-repository-tests';
import { UpdateRefreshTokenPayload } from '../graphql/inputs/update-refresh-token.payload';

const entityName = RefreshToken.name;

describe(`${entityName} Repository`, () => {
  let entityModel: Model<RefreshToken>;
  let userModel: Model<User>;
  let commonRepositoryTests: CommonRepositoryTests;
  let entityRepository: any;

  const createEntityInput: CreateRefreshTokenInput = {
    user: new Types.ObjectId().toHexString(),
    expiresIn: new Date().toISOString()
  };

  const updateEntityPayload: UpdateRefreshTokenPayload = {
    isRevoked: true
  };

  const createDocument = async (userId?: string) => {
    if (!userId) {
      userId = (await createUser()).id;
    }

    const entity = new entityModel({
      ...createEntityInput,
      user: userId,
      isRevoked: false,
      expiresIn: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    });

    return await entity.save();
  };

  const createUser = async () => {
    const entity = new userModel({
      name: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      socialProvider: AuthProviders.Local,
      authType: AuthType.PASSWORD,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return await entity.save();
  };

  beforeAll(async () => {
    process.env.REFRESH_TOKEN_EXPIRES_IN = '30s';

    const config = await initializeCommonRepositoryTests({
      Entity: RefreshToken,
      EntitySchema: RefreshTokenSchema,
      EntityRepository: RefreshTokenRepository,
      createEntityInput,
      createDocument,
      mongooseModels: [
        {
          name: User.name,
          schema: UserSchema
        }
      ]
    });

    commonRepositoryTests = config.commonRepositoryTests;

    entityRepository = config.entityRepository;

    entityModel = config.entityModel;
    userModel = config.mongooseTestModels[User.name];
  });

  afterEach(async () => {
    await entityModel.deleteMany({});
    await userModel.deleteMany({});
  });

  describe(`getOne${entityName}`, () => {
    it(`should throw an EntityNotFound exception if the given id does not match any existing ${entityName} entity`, async () => {
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
      const result = await entityRepository.createEntity(createEntityInput);
      const expectedValue = { ...createEntityInput };
      delete expectedValue.user;

      expect(result.user.toString()).toEqual(createEntityInput.user);
      expect(result.toObject()).toMatchObject(expectedValue);
    });
  });

  describe(`update${entityName}`, () => {
    it(`should throw an EntityNotFound exception if an id of a not existing ${entityName} entity is provided`, async () => {
      await commonRepositoryTests.updateEntityError(updateEntityPayload);
    });

    it(`should update the ${entityName} entity that match the given id, if valid fields are provided`, async () => {
      await commonRepositoryTests.updateEntity(updateEntityPayload);
    });
  });

  describe(`revoke${entityName}`, () => {
    it(`should return isRevoked true if at least one ${entityName} entity was marked as revoked`, async () => {
      const user = await createUser();

      await createDocument(user.id);
      await createDocument(user.id);

      const result = await entityRepository.revokeRefreshToken({
        user: user.id
      });

      expect(result.isRevoked).toBe(true);
    });

    it(`should update the ${entityName} entities to revoked`, async () => {
      const user = await createUser();

      const token1 = await createDocument(user.id);
      const token2 = await createDocument(user.id);

      expect(token1.isRevoked).toBe(false);
      expect(token2.isRevoked).toBe(false);

      await entityRepository.revokeRefreshToken({ user: user.id });

      const updatedToken1 = await entityModel.findById(token1._id);
      const updatedToken2 = await entityModel.findById(token2._id);

      expect(updatedToken1.isRevoked).toBe(true);
      expect(updatedToken2.isRevoked).toBe(true);
    });

    it(`should return isRevoked false if no ${entityName} entity was marked as revoked`, async () => {
      const user = await createUser();

      const result = await entityRepository.revokeRefreshToken({
        user: user.id
      });

      expect(result.isRevoked).toBe(false);
    });
  });
});
