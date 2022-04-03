import { initializeCommonRepositoryTests } from '@shared/test/initialize-common-repository-test';
import { Model } from 'mongoose';
import { AuthTokenRepository } from '../auth-token.repository';
import { AuthToken, AuthTokenSchema } from '../database/auth-token.entity';
import { CreateAuthTokenInternalInput } from '../dtos/create-auth-token-internal.input';
import { AuthTokenTypes } from '@user/graphql/enums/auth-token-types.enum';
import { EntryNotFoundException } from '@shared/errors/errors';
import { createUnhashedToken } from '../utils/create-unhashed-token';
import { hashToken } from '../utils/hash-token';

const entityName = AuthToken.name;

describe(`${entityName} Repository`, () => {
  let entityModel: Model<AuthToken>;
  let entityRepository: any;

  const createEntityInput: CreateAuthTokenInternalInput = {
    email: 'test@email.com',
    type: AuthTokenTypes.RESET_PASSWORD,
    origin: 'N/A',
  };

  const createAuthToken = async () => {
    const unhashedToken = createUnhashedToken();
    const token = hashToken(unhashedToken);

    const entity = new entityModel({
      ...createEntityInput,
      token,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });

    return await entity.save();
  };

  beforeAll(async () => {
    const config = await initializeCommonRepositoryTests({
      Entity: AuthToken,
      EntitySchema: AuthTokenSchema,
      EntityRepository: AuthTokenRepository,
      createEntityInput,
    });

    entityModel = config.entityModel;
    entityRepository = config.entityRepository;
  });

  afterEach(async () => {
    await entityModel.deleteMany({});
  });

  describe(`get${entityName}ByToken`, () => {
    it(`should throw an error if the given token does not match any existing ${entityName} entity`, async () => {
      //Arrange
      const token = createUnhashedToken();

      //Act
      const result = entityRepository.getAuthTokenByToken({ token });

      //Assert
      await expect(result).rejects.toThrow(EntryNotFoundException);
    });

    it(`should return the entity if the given token match an existing ${entityName} entity`, async () => {
      //Arrange
      const authToken = await createAuthToken();

      //Act
      const result = await entityRepository.getAuthTokenByToken({
        token: authToken.token,
      });

      //Assert
      expect(result.toObject()).toEqual(authToken.toObject());
    });
  });

  describe(`create${entityName}`, () => {
    it(`should create an ${entityName} entity given a valid input`, async () => {
      //Arrange and Act
      const result = await entityRepository.createAuthToken(createEntityInput);

      const expectedResult = {
        ...createEntityInput,
        token: result.token,
      };

      //Assert
      expect(result).toMatchObject(expectedResult);
    });

    it(`should return an unhashed token after creating an ${entityName} entity`, async () => {
      //Arrange
      const result = await entityRepository.createAuthToken(createEntityInput);

      const token = hashToken(result.token);

      //Act
      const result2 = await entityRepository.getAuthTokenByToken({ token });

      const expectedResult = { ...result, token };

      //Assert
      expect(result2.toObject()).toMatchObject(expectedResult);
    });
  });

  describe(`update${entityName}`, () => {
    it(`should throw an error if an id of a not existing ${entityName} entity is provided`, async () => {
      //Arrange
      const token = createUnhashedToken();

      //Act
      const result = entityRepository.updateAuthToken({ token });

      //Assert
      await expect(result).rejects.toThrow(EntryNotFoundException);
    });

    it(`should update the ${entityName} entity that match the given id, if valid fields are provided`, async () => {
      //Arrange
      const entity = await createAuthToken();

      //Act
      const result = await entityRepository.updateAuthToken({
        token: entity.token,
      });

      const expectedResult = {
        ...entity.toObject(),
        completed: true,
      };
      delete expectedResult.updatedAt;

      //Assert
      expect(result.toObject()).toMatchObject(expectedResult);
    });
  });
});
