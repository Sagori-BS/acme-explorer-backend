import { Test } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { mongooseModuleTesting } from '@shared/test/db-module';
import { CredentialService } from '../../credential/credential.service';
import { AuthRepository } from '../auth.repository';
import { AuthTokenService } from '../../auth-token/auth-token.service';
import { User, UserSchema } from '../../user/database/user.entity';
import { LoggerService } from '@shared/logger/logger.service';
import { EntryNotFoundException } from '@shared/errors/errors';
import { CreateAuthTokenInput } from '../../auth-token/graphql/inputs/create-auth-token.input';
import { ValidateAuthTokenInput } from '../../auth-token/graphql/inputs/validate-auth-token.input';
import { AuthProviders, AuthType } from '../utils/auth-providers.enum';
import { Model } from 'mongoose';
import { SignUpUserInput } from '../graphql/inputs/sign-up-user.input';
import { pubSubClient } from '@shared/config/clients/mock/pub-sub-client';
import { FirebaseAdminService } from '@user/firebase-admin/firebase-admin.service';
import { firebaseAdminService } from '@user/firebase-admin/mocks/firebase-admin.service';
import { PUB_SUB_CLIENT_TOKEN } from '@shared/microservices/pub-sub/constants/pub-sub-client.constants';
import { TokensService } from '../tokens.service';
import { loggerService } from '@shared/logger/mock/logger.service';
import { LoggerModule } from '@shared/logger/logger.module';
import { LoggerDestination } from '@shared/logger/logger.models';
import * as faker from 'faker';
import { BlockedUserError } from '../errors/blocked-user.error';
import { UpdateCredentialInput } from '../../credential/graphql/inputs/update-credential.input';
import { UserService } from '../../user/user.service';

describe(`AuthService`, () => {
  let authService: AuthService;
  let userModel: Model<User>;

  const credentialService = {
    getCredentialByIdOrEmail: jest.fn(),
    updateCredential: jest.fn(),
  };

  const tokensService = {
    signAccessToken: jest.fn(),
    createAndSignRefreshToken: jest.fn(),
    refreshAccessToken: jest.fn(),
    revokeRefreshToken: jest.fn(),
  };

  const userService = {
    getOneEntity: jest.fn(),
  };

  const authTokenService = {
    createAuthToken: jest.fn().mockReturnValue({ token: 'test@gmail.com' }),
    resetUserPassword: jest.fn(),
    validateAuthToken: jest.fn(),
  };

  const payload = { id: 'id', email: 'test@gmail.com', roles: ['test'] };

  const authRepository = {
    localSignUpUser: jest.fn().mockReturnValue(payload),
    socialSignUp: jest.fn().mockReturnValue({
      user: payload,
      isNew: true,
    }),
    blockUser: jest.fn(),
  };

  const createUser = async () => {
    const entity = new userModel({
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      socialProvider: AuthProviders.Local,
      authType: AuthType.PASSWORD,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return await entity.save();
  };

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [
        LoggerModule.register({
          destination: LoggerDestination.STD_OUT,
          isGlobal: true,
        }),
        mongooseModuleTesting.instance,
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: UserSchema,
          },
        ]),
      ],
      providers: [
        {
          provide: CredentialService,
          useValue: credentialService,
        },
        {
          provide: AuthTokenService,
          useValue: authTokenService,
        },
        {
          provide: AuthRepository,
          useValue: authRepository,
        },
        {
          provide: PUB_SUB_CLIENT_TOKEN,
          useValue: pubSubClient,
        },
        {
          provide: TokensService,
          useValue: tokensService,
        },
        {
          provide: FirebaseAdminService,
          useValue: firebaseAdminService,
        },
        {
          provide: LoggerService,
          useValue: loggerService,
        },
        {
          provide: UserService,
          useValue: userService,
        },
        AuthService,
      ],
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
        password: 'password',
      });

      await authService.validateCredential(email, password);

      expect(credentialService.getCredentialByIdOrEmail).toHaveBeenCalled();
      expect(credentialService.getCredentialByIdOrEmail).toHaveBeenCalledWith({
        email,
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
        blocked: true,
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
        blocked: false,
      });
      const email = faker.internet.email();

      const updateCredentialInput: UpdateCredentialInput = {
        where: { email },
        data: { blocked: false },
      };

      await authService.unblockUser({ email });

      expect(credentialService.updateCredential).toHaveBeenCalled();
      expect(credentialService.updateCredential).toHaveBeenLastCalledWith(
        updateCredentialInput,
      );
    });
  });

  describe(`socialSignUp`, () => {
    it(`should call the auth.verifyIdToken method of the firebaseAdminService`, async () => {
      const socialSignInInput = {
        token: 'test',
      };

      await authService.socialSignUp(socialSignInInput);

      expect(firebaseAdminService.auth.verifyIdToken).toHaveBeenCalled();
      expect(firebaseAdminService.auth.verifyIdToken).toHaveBeenLastCalledWith(
        socialSignInInput.token,
      );
    });

    it(`should call the socialSignUp method of the auth repository`, async () => {
      const socialSignInInput = {
        token: 'test',
      };

      await authService.socialSignUp(socialSignInInput);

      expect(authRepository.socialSignUp).toHaveBeenCalled();
    });

    it(`should call the verifyIdToken of the firebase admin service`, async () => {
      const socialSignInInput = {
        token: 'test',
      };

      await authService.socialSignUp(socialSignInInput);

      expect(firebaseAdminService.auth.verifyIdToken).toHaveBeenCalled();
      expect(firebaseAdminService.auth.verifyIdToken).toHaveBeenLastCalledWith(
        socialSignInInput.token,
      );
    });

    it(`should call the signAccessToken method of the tokensService`, async () => {
      const socialSignInInput = {
        token: 'test',
      };

      const user = await createUser();

      authRepository.socialSignUp.mockReturnValueOnce({ user });

      await authService.socialSignUp(socialSignInInput);

      expect(tokensService.signAccessToken).toHaveBeenCalled();
      expect(tokensService.signAccessToken).toHaveBeenLastCalledWith(user);
    });

    it(`should call the send method of the client`, async () => {
      const socialSignInInput = {
        token: 'test',
      };

      await authService.socialSignUp(socialSignInInput);

      expect(pubSubClient.send).toHaveBeenCalled();
    });
  });

  describe(`resetUserPassword`, () => {
    it(`should call the resetUserPassword method of the AuthTokenService`, async () => {
      const createAuthTokenInput: CreateAuthTokenInput = {
        email: 'test@test.com',
        origin: 'local',
      };

      await authService.resetUserPassword(createAuthTokenInput);

      expect(authTokenService.resetUserPassword).toHaveBeenCalled();
      expect(authTokenService.resetUserPassword).toHaveBeenLastCalledWith(
        createAuthTokenInput,
      );
    });
  });

  describe(`validateAuthToken`, () => {
    it(`should call the validateAuthToken method of the AuthTokenService`, async () => {
      const validateTokenInput: ValidateAuthTokenInput = {
        token: 'token',
        origin: 'local',
      };

      await authService.validateAuthToken(validateTokenInput);

      expect(authTokenService.validateAuthToken).toHaveBeenCalled();
      expect(authTokenService.validateAuthToken).toHaveBeenLastCalledWith(
        validateTokenInput,
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
  });

  describe(`signUpUser`, () => {
    it(`should call the localSignUpUser method of the AuthRepository`, async () => {
      const signUpUserInput: SignUpUserInput = {
        email: 'test@test.com',
        name: 'test',
      };

      const expectedValue = {
        ...signUpUserInput,
        authType: AuthType.PASSWORD,
        socialProvider: AuthProviders.Local,
      };
      await authService.signUpUser(signUpUserInput);

      expect(authRepository.localSignUpUser).toHaveBeenCalled();
      expect(authRepository.localSignUpUser).toHaveBeenCalledWith(
        expectedValue,
      );
    });

    it(`should call the signAccessToken method of the tokensService`, async () => {
      const signUpUserInput: SignUpUserInput = {
        email: 'test@test.com',
        name: 'test',
      };

      const user = await createUser();

      authRepository.localSignUpUser.mockReturnValueOnce(user);

      await authService.signUpUser(signUpUserInput);

      expect(tokensService.signAccessToken).toHaveBeenCalled();
      expect(tokensService.signAccessToken).toHaveBeenCalledWith(user);
    });

    it(`should call the createAuthToken of the authTokenService`, async () => {
      const signUpUserInput: SignUpUserInput = {
        email: 'test@test.com',
        name: 'test',
      };

      await authService.signUpUser(signUpUserInput);

      expect(authTokenService.createAuthToken).toHaveBeenCalled();
    });

    it(`should call the send method of the client`, async () => {
      const signUpUserInput: SignUpUserInput = {
        email: 'test@test.com',
        name: 'test',
      };

      await authService.signUpUser(signUpUserInput);

      expect(pubSubClient.send).toHaveBeenCalled();
    });
  });
});
