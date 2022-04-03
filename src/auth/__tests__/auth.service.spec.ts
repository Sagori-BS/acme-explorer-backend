import { pubSubClient } from '@common/common/config/clients/mock/pub-sub-client';
import { EntryNotFoundException } from '@common/common/errors/errors';
import { DEFAULT_LANGUAGE_OPTIONS_DTO } from '@common/common/language/dtos/request-language-options.dto';
import { LoggerDestination } from '@common/common/logger/logger.models';
import { LoggerModule } from '@common/common/logger/logger.module';
import { LoggerService } from '@common/common/logger/logger.service';
import { loggerService } from '@common/common/logger/mock/logger.service';
import { PUB_SUB_CLIENT_TOKEN } from '@common/common/microservices/pub-sub/constants/pub-sub-client.constants';
import { mongooseModuleTesting } from '@common/common/test/db-module';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';
import { Model, Types } from 'mongoose';
import { AuthTokenService } from '../../auth-token/auth-token.service';
import { CreateAuthTokenInput } from '../../auth-token/graphql/inputs/create-auth-token.input';
import { ValidateAuthTokenInput } from '../../auth-token/graphql/inputs/validate-auth-token.input';
import { CredentialService } from '../../credential/credential.service';
import { UpdateCredentialInput } from '../../credential/graphql/inputs/update-credential.input';
import { User, UserSchema } from '../../user/database/user.entity';
import { SocialSignInInput } from '../../user/graphql/inputs/social-sign-in.input';
import { UserService } from '../../user/user.service';
import { AuthRepository } from '../auth.repository';
import { AuthService } from '../auth.service';
import { BlockedUserError } from '../errors/blocked-user.error';
import { RefreshAccessTokenInput } from '../graphql/inputs/refresh-access-token.input';
import { RevokeRefreshTokenInput } from '../graphql/inputs/revoke-refresh-token.input';
import { SignUpUserInput } from '../graphql/inputs/sign-up-user.input';
import { SocialLoginService } from '../social-login.service';
import { TokensService } from '../tokens.service';
import { AuthProviders, AuthType } from '../utils/auth-providers.enum';
import { SocialLoginServiceMock } from './mocks/social-login.service.mock';

describe(`AuthService`, () => {
  let authService: AuthService;
  let userModel: Model<User>;

  const credentialService = {
    getCredentialByIdOrEmail: jest.fn(),
    updateCredential: jest.fn()
  };

  const tokensService = {
    signAccessToken: jest.fn(),
    createAndSignRefreshToken: jest.fn(),
    refreshAccessToken: jest.fn(),
    revokeRefreshToken: jest.fn()
  };

  const userService = {
    getOneEntity: jest.fn()
  };

  const authTokenService = {
    createAuthToken: jest.fn().mockReturnValue({ token: 'test@gmail.com' }),
    resetUserPassword: jest.fn(),
    validateAuthToken: jest.fn()
  };

  const payload = { id: 'id', email: 'test@gmail.com', roles: ['test'] };

  const authRepository = {
    localSignUpUser: jest.fn().mockReturnValue(payload),
    socialSignUp: jest.fn().mockReturnValue({
      user: payload,
      isNew: true
    }),
    blockUser: jest.fn()
  };

  const signUpUserInput: SignUpUserInput = {
    email: faker.internet.email(),
    lastName: faker.lorem.word(),
    name: faker.lorem.word()
  };

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

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [
        LoggerModule.register({
          destination: LoggerDestination.STD_OUT,
          isGlobal: true
        }),
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
          provide: SocialLoginService,
          useValue: SocialLoginServiceMock
        },
        {
          provide: AuthTokenService,
          useValue: authTokenService
        },
        {
          provide: AuthRepository,
          useValue: authRepository
        },
        {
          provide: PUB_SUB_CLIENT_TOKEN,
          useValue: pubSubClient
        },
        {
          provide: TokensService,
          useValue: tokensService
        },
        {
          provide: LoggerService,
          useValue: loggerService
        },
        {
          provide: UserService,
          useValue: userService
        },
        AuthService
      ]
    }).compile();

    authService = testModule.get<AuthService>(AuthService);
    userModel = testModule.get<Model<User>>(getModelToken(User.name));
  });

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  describe(`validateCredential`, () => {
    it(`should call the getCredentialByIdOrEmail of the credentialService`, async () => {
      const email = faker.internet.email();
      const password = faker.internet.password(8);

      credentialService.getCredentialByIdOrEmail.mockReturnValueOnce({
        password: faker.internet.password(8)
      });

      await authService.validateCredential(email, password);

      expect(credentialService.getCredentialByIdOrEmail).toHaveBeenCalled();
      expect(credentialService.getCredentialByIdOrEmail).toHaveBeenCalledWith({
        email
      });
    });

    it(`should return false if any exception, different thatn BlockUserError, is thrown`, async () => {
      const email = faker.internet.email();
      const password = faker.internet.password(8);

      credentialService.getCredentialByIdOrEmail.mockImplementation(() => {
        throw new EntryNotFoundException();
      });

      const result = await authService.validateCredential(email, password);

      expect(result).toBe(false);
    });

    it(`should throw BlockedUserError if the user's credential is blocked`, async () => {
      const email = faker.internet.email();
      const password = faker.internet.password(8);

      credentialService.getCredentialByIdOrEmail.mockReturnValueOnce({
        blocked: true
      });

      const result = authService.validateCredential(email, password);

      await expect(result).rejects.toThrow(BlockedUserError);
    });
  });

  describe(`blockUser`, () => {
    it(`should call the blockUser method of the AuthRepository`, async () => {
      const email = faker.internet.email();

      await authService.blockUser({ email });

      expect(authRepository.blockUser).toHaveBeenCalled();
      expect(authRepository.blockUser).toHaveBeenLastCalledWith({ email });
    });
  });

  describe(`unblockUser`, () => {
    it(`should call the updateCredential method of the CredentialService`, async () => {
      credentialService.updateCredential.mockReturnValueOnce({
        blocked: false
      });
      const email = faker.internet.email();

      const updateCredentialInput: UpdateCredentialInput = {
        where: { email },
        data: { blocked: false }
      };

      await authService.unblockUser({ email });

      expect(credentialService.updateCredential).toHaveBeenCalled();
      expect(credentialService.updateCredential).toHaveBeenLastCalledWith(
        updateCredentialInput
      );
    });
  });

  describe(`socialSignUp`, () => {
    it(`should call the getUser method of the SocialLoginService`, async () => {
      const socialSignInInput = {
        token: 'test'
      };

      await authService.socialSignUp(socialSignInInput);

      expect(SocialLoginServiceMock.getUser).toHaveBeenCalled();
      expect(SocialLoginServiceMock.getUser).toHaveBeenLastCalledWith(
        socialSignInInput.token
      );
    });

    it(`should call the socialSignUp method of the auth repository`, async () => {
      const socialSignInInput = {
        token: 'test'
      };

      await authService.socialSignUp(socialSignInInput);

      expect(authRepository.socialSignUp).toHaveBeenCalled();
    });

    it(`should call the signAccessToken method of the tokensService`, async () => {
      const socialSignInInput = {
        token: 'test'
      };

      const user = await createUser();

      authRepository.socialSignUp.mockReturnValueOnce({ user });

      await authService.socialSignUp(socialSignInInput);

      expect(tokensService.signAccessToken).toHaveBeenCalled();
      expect(tokensService.signAccessToken).toHaveBeenLastCalledWith(user);
    });

    it(`should call the createAndSignRefreshToken method of the tokensService`, async () => {
      const socialSignInInput: SocialSignInInput = {
        token: 'test'
      };

      const user = await createUser();

      authRepository.socialSignUp.mockReturnValueOnce({ user });

      await authService.socialSignUp(socialSignInInput);

      expect(tokensService.createAndSignRefreshToken).toHaveBeenCalled();
      expect(tokensService.createAndSignRefreshToken).toHaveBeenLastCalledWith(
        user
      );
    });

    it(`should call the send method of the client`, async () => {
      const socialSignInInput = {
        token: 'test'
      };

      await authService.socialSignUp(socialSignInInput);

      expect(pubSubClient.send).toHaveBeenCalled();
    });
  });

  describe(`revokeRefreshToken`, () => {
    it(`should call the revokeRefreshToken method of the TokensService`, async () => {
      const revokeRefreshTokenInput: RevokeRefreshTokenInput = {
        user: new Types.ObjectId().toHexString()
      };

      await authService.revokeRefreshToken(revokeRefreshTokenInput);

      expect(tokensService.revokeRefreshToken).toHaveBeenCalled();
      expect(tokensService.revokeRefreshToken).toHaveBeenLastCalledWith(
        revokeRefreshTokenInput
      );
    });
  });

  describe(`refreshAccessToken`, () => {
    it(`should call the refreshAccessToken method of the TokensService`, async () => {
      const refreshAccessTokenInput: RefreshAccessTokenInput = {
        refreshToken: 'randomrefreshtoken'
      };

      await authService.refreshAccessToken(refreshAccessTokenInput);

      expect(tokensService.refreshAccessToken).toHaveBeenCalled();
      expect(tokensService.refreshAccessToken).toHaveBeenLastCalledWith(
        refreshAccessTokenInput,
        DEFAULT_LANGUAGE_OPTIONS_DTO
      );
    });
  });

  describe(`resetUserPassword`, () => {
    it(`should call the resetUserPassword method of the AuthTokenService`, async () => {
      const createAuthTokenInput: CreateAuthTokenInput = {
        email: 'test@test.com',
        origin: 'local'
      };

      await authService.resetUserPassword(createAuthTokenInput);

      expect(authTokenService.resetUserPassword).toHaveBeenCalled();
      expect(authTokenService.resetUserPassword).toHaveBeenLastCalledWith(
        createAuthTokenInput
      );
    });
  });

  describe(`validateAuthToken`, () => {
    it(`should call the validateAuthToken method of the AuthTokenService`, async () => {
      const validateTokenInput: ValidateAuthTokenInput = {
        token: 'token',
        origin: 'local'
      };

      await authService.validateAuthToken(validateTokenInput);

      expect(authTokenService.validateAuthToken).toHaveBeenCalled();
      expect(authTokenService.validateAuthToken).toHaveBeenLastCalledWith(
        validateTokenInput
      );
    });
  });

  describe(`signInUser`, () => {
    it(`should call the signAccessToken method of the TokensService`, async () => {
      const user = await createUser();

      await authService.signInUser(user);

      expect(tokensService.signAccessToken).toHaveBeenCalled();
      expect(tokensService.signAccessToken).toHaveBeenCalledWith(user);
    });

    it(`should call the createAndSignRefreshToken method of the TokensService`, async () => {
      const user = await createUser();

      await authService.signInUser(user);

      expect(tokensService.createAndSignRefreshToken).toHaveBeenCalled();
      expect(tokensService.createAndSignRefreshToken).toHaveBeenCalledWith(
        user
      );
    });
  });

  describe(`signUpUser`, () => {
    it(`should call the localSignUpUser method of the AuthRepository`, async () => {
      // Arrange
      const expectedValue = {
        ...signUpUserInput,
        authType: AuthType.PASSWORD,
        socialProvider: AuthProviders.Local
      };

      // Act
      await authService.signUpUser(signUpUserInput);

      // Assert
      expect(authRepository.localSignUpUser).toHaveBeenCalled();
      expect(authRepository.localSignUpUser).toHaveBeenCalledWith(
        expectedValue,
        DEFAULT_LANGUAGE_OPTIONS_DTO
      );
    });

    it(`should call the signAccessToken method of the tokensService`, async () => {
      // Arrange
      const user = await createUser();

      authRepository.localSignUpUser.mockReturnValueOnce(user);

      // Act
      await authService.signUpUser(signUpUserInput);

      // Assert
      expect(tokensService.signAccessToken).toHaveBeenCalled();
      expect(tokensService.signAccessToken).toHaveBeenCalledWith(user);
    });

    it(`should call the createAndSignRefreshToken method of the tokensService`, async () => {
      // Arrange
      const user = await createUser();

      authRepository.localSignUpUser.mockReturnValueOnce(user);

      // Act
      await authService.signUpUser(signUpUserInput);

      // Assert
      expect(tokensService.createAndSignRefreshToken).toHaveBeenCalled();
      expect(tokensService.createAndSignRefreshToken).toHaveBeenCalledWith(
        user
      );
    });

    it(`should call the createAuthToken of the authTokenService`, async () => {
      await authService.signUpUser(signUpUserInput);

      expect(authTokenService.createAuthToken).toHaveBeenCalled();
    });

    it(`should call the send method of the client`, async () => {
      await authService.signUpUser(signUpUserInput);

      expect(pubSubClient.send).toHaveBeenCalled();
    });
  });
});
