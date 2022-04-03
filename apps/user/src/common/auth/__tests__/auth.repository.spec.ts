import { mongooseModuleTesting } from '@shared/test/db-module';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { UserSchema, User } from '../../user/database/user.entity';
import { AuthRepository } from '../auth.repository';
import { Model } from 'mongoose';
import { SignUpUserInput } from '../graphql/inputs/sign-up-user.input';
import { ErrorMessage } from '@shared/errors/enums/error-message-types.enum';
import {
  InvalidFunctionInputError,
  TestFailedError,
} from '@shared/errors/errors';
import { AuthProviders, AuthType } from '../utils/auth-providers.enum';
import { loggerService } from '@shared/logger/mock/logger.service';
import { CredentialService } from '../../credential/credential.service';
import { CredentialRepository } from '../../credential/credential.repository';
import { Types } from 'mongoose';
import * as faker from 'faker';
import {
  CredentialSchema,
  Credential,
} from '../../credential/database/credential.entity';
import { ConfigModule } from '@nestjs/config';
import { LoggerService } from '@shared/logger/logger.service';
import { UpdateUserPasswordInput } from '../graphql/inputs/update-user-password.input';
import { UpdateCredentialPasswordInput } from '../../credential/graphql/inputs/update-credential-password.input';
import { UserRepository } from '../../user/user.repository';

describe('AuthRepository', () => {
  const credentialService = {
    createCredential: jest.fn(),
  };

  const credentialRepository = {
    getCredentialByIdOrEmail: jest.fn(),
    createCredential: jest.fn(),
    updateCredential: jest.fn(),
    updateCredentialPassword: jest.fn(),
    deleteCredential: jest.fn(),
  };

  const userRepository = {
    getOneEntity: jest.fn(),
  };

  let authRepository: AuthRepository;
  let userModel: Model<User>;

  // TODO: Use common module for testing
  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [
        mongooseModuleTesting.instance,
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: UserSchema,
          },
          {
            name: Credential.name,
            schema: CredentialSchema,
          },
        ]),
      ],
      providers: [
        AuthRepository,
        {
          provide: CredentialService,
          useValue: credentialService,
        },
        {
          provide: CredentialRepository,
          useValue: credentialRepository,
        },
        {
          provide: UserRepository,
          useValue: userRepository,
        },
        {
          provide: LoggerService,
          useValue: loggerService,
        },
      ],
    }).compile();

    authRepository = testModule.get<AuthRepository>(AuthRepository);
    userModel = testModule.get<Model<User>>(getModelToken(User.name));
  });

  afterEach(async () => {
    userModel.deleteMany({});
  });

  describe('localSignUp', () => {
    it('throws an error if the authType field is not set', async done => {
      const input: SignUpUserInput = {
        email: 'email@email.com',
        name: 'userName',
        socialProvider: AuthProviders.Local,
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
        name: 'userName',
        authType: AuthType.PASSWORD,
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
        name: faker.name.firstName(),
        socialProvider: AuthProviders.Local,
      };

      const res = authRepository.socialSignUp(input);

      await expect(res).rejects.toThrow(InvalidFunctionInputError);
    });

    it('throws an error if the socialProvider field is not set', async () => {
      const input: SignUpUserInput = {
        email: 'email@email.com',
        name: 'userName',
        socialProvider: AuthProviders.Local,
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
      oldPassword: faker.internet.password(),
    };

    it('should call the updateCredentialPassword method of the credentialRepository', async () => {
      const updateCredentialPasswordInput: UpdateCredentialPasswordInput = {
        where: { email: updateUserPasswordInput.email },
        data: {
          password: updateUserPasswordInput.newPassword,
          oldPassword: updateUserPasswordInput.oldPassword,
        },
      };

      await authRepository.updateUserPassword(updateUserPasswordInput);

      expect(credentialRepository.updateCredentialPassword).toHaveBeenCalled();
      expect(
        credentialRepository.updateCredentialPassword,
      ).toHaveBeenCalledWith(updateCredentialPasswordInput, expect.anything());
    });
  });
});
