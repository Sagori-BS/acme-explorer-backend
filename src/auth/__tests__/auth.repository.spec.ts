import { mongooseModuleTesting } from '@common/common/test/db-module';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { UserSchema, User } from '../../user/database/user.entity';
import { AuthRepository } from '../auth.repository';
import { Model } from 'mongoose';
import { SignUpUserInput } from '../graphql/inputs/sign-up-user.input';
import { ErrorMessage } from '@common/common/errors/enums/error-message-types.enum';
import {
  InvalidFunctionInputError,
  TestFailedError
} from '@common/common/errors/errors';
import { AuthProviders, AuthType } from '../utils/auth-providers.enum';
import { loggerService } from '@common/common/logger/mock/logger.service';
import { RefreshTokenService } from '../../refresh-token/refresh-token.service';
import { RefreshTokenRepository } from '../../refresh-token/refresh-token.repository';
import { CredentialService } from '../../credential/credential.service';
import { CredentialRepository } from '../../credential/credential.repository';
import { Types } from 'mongoose';
import * as faker from 'faker';
import {
  CredentialSchema,
  Credential
} from '../../credential/database/credential.entity';
import { ConfigModule } from '@nestjs/config';
import { LoggerService } from '@common/common/logger/logger.service';
import { UpdateUserPasswordInput } from '../graphql/inputs/update-user-password.input';
import { UpdateCredentialPasswordInput } from '../../credential/graphql/inputs/update-credential-password.input';
import { RoleRepository } from '../../role/role.repository';
import { UserRepository } from '../../user/user.repository';
import { EntityNotFoundError } from '@common/common/errors/common/entity-not-found.error';

describe('AuthRepository', () => {
  const credentialService = {
    createCredential: jest.fn()
  };

  const credentialRepository = {
    getCredentialByIdOrEmail: jest.fn(),
    createCredential: jest.fn(),
    updateCredential: jest.fn().mockReturnValue({ blocked: true }),
    updateCredentialPassword: jest.fn(),
    deleteCredential: jest.fn()
  };

  const roleRepository = {
    getOneEntity: jest.fn()
  };

  const userRepository = {
    getOneEntity: jest.fn()
  };

  const refreshTokenService = {
    getRefreshTokenById: jest.fn(),
    createRefreshToken: jest.fn(),
    revokeRefreshToken: jest.fn()
  };

  const refreshTokenRepository = {
    revokeRefreshToken: jest.fn()
  };

  let authRepository: AuthRepository;
  let userModel: Model<User>;
  let credentialModel: Model<Credential>;

  const createUser = async () => {
    const entity = new userModel({
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      socialProvider: AuthProviders.Local,
      authType: AuthType.PASSWORD,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return await entity.save();
  };

  const createCredential = async email => {
    const entity = new credentialModel({
      email,
      password: faker.internet.password(),
      provider: AuthProviders.Local,
      authType: AuthType.PASSWORD,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return await entity.save();
  };

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [
        mongooseModuleTesting.instance,
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: UserSchema
          },
          {
            name: Credential.name,
            schema: CredentialSchema
          }
        ])
      ],
      providers: [
        AuthRepository,
        {
          provide: CredentialService,
          useValue: credentialService
        },
        {
          provide: CredentialRepository,
          useValue: credentialRepository
        },
        {
          provide: RoleRepository,
          useValue: roleRepository
        },
        {
          provide: UserRepository,
          useValue: userRepository
        },
        {
          provide: RefreshTokenService,
          useValue: refreshTokenService
        },
        {
          provide: RefreshTokenRepository,
          useValue: refreshTokenRepository
        },
        {
          provide: LoggerService,
          useValue: loggerService
        }
      ]
    }).compile();

    authRepository = testModule.get<AuthRepository>(AuthRepository);
    userModel = testModule.get<Model<User>>(getModelToken(User.name));
    credentialModel = testModule.get<Model<Credential>>(
      getModelToken(Credential.name)
    );
  });

  afterEach(async () => {
    userModel.deleteMany({});
    credentialModel.deleteMany({});
  });

  describe('localSignUp', () => {
    it('throws an error if the authType field is not set', async done => {
      const input: SignUpUserInput = {
        email: 'email@email.com',
        lastName: 'user lastname',
        name: 'userName',
        socialProvider: AuthProviders.Local
      };

      try {
        await authRepository.localSignUpUser(input);
      } catch (error) {
        expect(error.message).toEqual(ErrorMessage.InvalidFunctionInput);
        return done();
      }

      throw new TestFailedError();
    });

    it('throws an error if the socialProvider field is not set', async done => {
      const input: SignUpUserInput = {
        email: 'email@email.com',
        lastName: 'user lastname',
        name: 'userName',
        authType: AuthType.PASSWORD
      };

      try {
        await authRepository.localSignUpUser(input);
      } catch (error) {
        expect(error.message).toEqual(ErrorMessage.InvalidFunctionInput);
        return done();
      }

      throw new TestFailedError();
    });
  });

  describe('socialSignUp', () => {
    it('throws an error if the authType field is not set', async () => {
      const input: SignUpUserInput = {
        email: 'email@email.com',
        lastName: 'user lastname',
        name: 'userName',
        socialProvider: AuthProviders.Local
      };

      const res = authRepository.socialSignUp(input);

      await expect(res).rejects.toThrow(InvalidFunctionInputError);
    });

    it('throws an error if the socialProvider field is not set', async () => {
      const input: SignUpUserInput = {
        email: 'email@email.com',
        lastName: 'user lastname',
        name: 'userName',
        socialProvider: AuthProviders.Local
      };

      const res = authRepository.socialSignUp(input);

      await expect(res).rejects.toThrow(InvalidFunctionInputError);
    });
  });

  describe('updateUserPassword', () => {
    const updateUserPasswordInput: UpdateUserPasswordInput = {
      email: faker.internet.email(),
      userId: new Types.ObjectId().toString(),
      newPassword: faker.internet.password(),
      oldPassword: faker.internet.password()
    };

    it('should call the updateCredentialPassword method of the credentialRepository', async () => {
      const updateCredentialPasswordInput: UpdateCredentialPasswordInput = {
        where: { email: updateUserPasswordInput.email },
        data: {
          password: updateUserPasswordInput.newPassword,
          oldPassword: updateUserPasswordInput.oldPassword
        }
      };

      await authRepository.updateUserPassword(updateUserPasswordInput);

      expect(credentialRepository.updateCredentialPassword).toHaveBeenCalled();
      expect(
        credentialRepository.updateCredentialPassword
      ).toHaveBeenCalledWith(updateCredentialPasswordInput, expect.anything());
    });

    it('should call the revokeRefreshToken method of the refreshTokenRepository', async () => {
      await authRepository.updateUserPassword(updateUserPasswordInput);

      expect(refreshTokenRepository.revokeRefreshToken).toHaveBeenCalled();
      expect(refreshTokenRepository.revokeRefreshToken).toHaveBeenCalledWith(
        { user: updateUserPasswordInput.userId },
        expect.anything()
      );
    });
  });

  describe('blockUser', () => {
    it('should throw an EntityNotFoundError error if the user is not found', async () => {
      const result = authRepository.blockUser({
        email: faker.internet.email()
      });

      await expect(result).rejects.toThrow(EntityNotFoundError);
    });

    it(`should return blocked equal to true if the user's credential was succesfully blocked`, async () => {
      // Arrange
      const user = await createUser();
      const credential = await createCredential(user.email);

      // Act
      const result = await authRepository.blockUser({ email: user.email });

      // Assert
      expect(credential.blocked).toBe(false);
      expect(result.blocked).toBe(true);
    });
  });
});
