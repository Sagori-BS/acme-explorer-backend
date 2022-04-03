import { Injectable } from '@nestjs/common';
import { LoggerService } from '@shared/logger/logger.service';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { createEntityLog } from '@shared/functions/log-message-builder';
import { User } from '../user/database/user.entity';
import { SignUpUserInput } from './graphql/inputs/sign-up-user.input';
import {
  InvalidFunctionInputError,
  InvalidSignInMethodError,
} from '@shared/errors/errors';
import { AuthType } from './utils/auth-providers.enum';
import { BlockUserType } from './graphql/types/block-user.type';
import { CredentialRepository } from '../credential/credential.repository';
import { EntityNotFoundError } from '@shared/errors/common/entity-not-found.error';
import { UpdateCredentialInput } from '../credential/graphql/inputs/update-credential.input';
import { BlockUserInput } from './graphql/inputs/block-user.input';
import { UpdateUserPasswordInput } from './graphql/inputs/update-user-password.input';
import { UpdateUserPasswordType } from './graphql/types/updated-user-password.type';
import { UpdateCredentialPasswordInput } from '../credential/graphql/inputs/update-credential-password.input';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthRepository {
  constructor(
    private readonly logger: LoggerService,
    private readonly credentialRepository: CredentialRepository,
    private readonly userRepository: UserRepository,

    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  public async localSignUpUser(
    signUpUserInput: SignUpUserInput,
  ): Promise<User> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const { email, password, authType, socialProvider } = signUpUserInput;

      if (!authType || !socialProvider) {
        throw new InvalidFunctionInputError();
      }

      this.logger.log(createEntityLog(User.name, signUpUserInput));

      await this.credentialRepository.createCredential(
        { email, password },
        session,
      );

      delete signUpUserInput.password;

      const user = new this.userModel({
        ...signUpUserInput,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      await user.save({ session });
      await session.commitTransaction();

      return await this.userRepository.getOneEntity({ email });
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  public async socialSignUp(
    signUpUserInput: SignUpUserInput,
  ): Promise<{ user: User; isNew: boolean }> {
    let isNew = false;

    try {
      const { email, authType, socialProvider } = signUpUserInput;

      if (!authType || !socialProvider) {
        throw new InvalidFunctionInputError();
      }

      let user = await this.userModel.findOne({ email });

      if (!user) {
        user = new this.userModel({
          ...signUpUserInput,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        isNew = true;

        await user.save();
      }

      if (user.authType !== AuthType.SOCIAL) {
        throw new InvalidSignInMethodError();
      }

      return { user, isNew };
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }

  public async blockUser(
    blockUserInput: BlockUserInput,
  ): Promise<BlockUserType> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const user = await this.userModel.findOne({
        email: blockUserInput.email,
      });

      if (!user) {
        throw new EntityNotFoundError(User.name);
      }

      const updateCredentialInput: UpdateCredentialInput = {
        where: { email: user.email },
        data: {
          blocked: true,
        },
      };

      const credential = await this.credentialRepository.updateCredential(
        updateCredentialInput,
        session,
      );

      await session.commitTransaction();

      return { blocked: credential.blocked };
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  public async updateUserPassword(
    updateUserPassword: UpdateUserPasswordInput,
  ): Promise<UpdateUserPasswordType> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const { email, oldPassword, newPassword } = updateUserPassword;

      const updateCredentialPasswordInput: UpdateCredentialPasswordInput = {
        where: { email },
        data: {
          password: newPassword,
          oldPassword,
        },
      };

      const credential = await this.credentialRepository.updateCredentialPassword(
        updateCredentialPasswordInput,
        session,
      );

      await session.commitTransaction();

      return { passwordUpdated: credential ? true : false };
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
