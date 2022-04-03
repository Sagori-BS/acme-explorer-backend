import { Injectable } from '@nestjs/common';
import { LoggerService } from '@common/common/logger/logger.service';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { createEntityLog } from '@common/common/functions/log-message-builder';
import { User } from '../user/database/user.entity';
import { SignUpUserInput } from './graphql/inputs/sign-up-user.input';
import { InvalidFunctionInputError } from '@common/common/errors/errors';
import { AuthType } from './utils/auth-providers.enum';
import { BlockUserType } from './graphql/types/block-user.type';
import { CredentialRepository } from '../credential/credential.repository';
import { RefreshTokenRepository } from '../refresh-token/refresh-token.repository';
import { EntityNotFoundError } from '@common/common/errors/common/entity-not-found.error';
import { UpdateCredentialInput } from '../credential/graphql/inputs/update-credential.input';
import { BlockUserInput } from './graphql/inputs/block-user.input';
import { UpdateUserPasswordInput } from './graphql/inputs/update-user-password.input';
import { UpdateUserPasswordType } from './graphql/types/updated-user-password.type';
import { UpdateCredentialPasswordInput } from '../credential/graphql/inputs/update-credential-password.input';
import { RoleRepository } from '../role/role.repository';
import { UserRoles } from '@common/common/auth/enums/user-roles.enum';
import { UserRepository } from '../user/user.repository';
import {
  DEFAULT_LANGUAGE_OPTIONS_DTO,
  RequestLanguageOptionsDto
} from '@common/common/language/dtos/request-language-options.dto';
import { BaseModel } from '@common/common/language/interfaces/base-model.interface';
import { InvalidSignInMethodError } from './errors/invalid-sign-in-method.error';

@Injectable()
export class AuthRepository {
  constructor(
    private readonly logger: LoggerService,
    private readonly credentialRepository: CredentialRepository,
    private readonly roleRepository: RoleRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userRepository: UserRepository,
    @InjectModel(User.name)
    private readonly userModel: BaseModel<User>,
    @InjectConnection()
    private readonly connection: Connection
  ) {}

  public async localSignUpUser(
    signUpUserInput: SignUpUserInput,
    requestLanguageOptionsDto: RequestLanguageOptionsDto = DEFAULT_LANGUAGE_OPTIONS_DTO
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
        session
      );

      delete signUpUserInput.password;

      const clientRole = await this.roleRepository.getOneEntity({
        slug: UserRoles.CLIENT
      });

      const user = new this.userModel({
        ...signUpUserInput,
        roles: [clientRole.id],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      await user.save({ session });
      await session.commitTransaction();

      return await this.userRepository.getOneEntity(
        { email },
        requestLanguageOptionsDto
      );
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  // TODO: Refactor the code
  public async socialSignUp(
    signUpUserInput: SignUpUserInput,
    requestLanguageOptionsDto: RequestLanguageOptionsDto = DEFAULT_LANGUAGE_OPTIONS_DTO
  ): Promise<{ user: User; isNew: boolean }> {
    let isNew = false;

    try {
      const { email, authType, socialProvider } = signUpUserInput;

      if (!authType || !socialProvider) {
        throw new InvalidFunctionInputError();
      }

      const checkUser = await this.userModel.findOne({ email });

      if (!checkUser) {
        const clientRole = await this.roleRepository.getOneEntity({
          slug: UserRoles.CLIENT
        });

        const newUser = new this.userModel({
          ...signUpUserInput,
          roles: [clientRole.id],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });

        isNew = true;

        await newUser.save();
      }

      const user = await this.userRepository.getOneEntity(
        { email },
        requestLanguageOptionsDto
      );

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
    blockUserInput: BlockUserInput
  ): Promise<BlockUserType> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const user = await this.userModel.findOne({
        email: blockUserInput.email
      });

      if (!user) {
        throw new EntityNotFoundError(User.name);
      }

      await this.refreshTokenRepository.revokeRefreshToken(
        {
          user: user.id
        },
        session
      );

      const updateCredentialInput: UpdateCredentialInput = {
        where: { email: user.email },
        data: {
          blocked: true
        }
      };

      const credential = await this.credentialRepository.updateCredential(
        updateCredentialInput,
        session
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
    updateUserPassword: UpdateUserPasswordInput
  ): Promise<UpdateUserPasswordType> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const { email, userId, oldPassword, newPassword } = updateUserPassword;

      const updateCredentialPasswordInput: UpdateCredentialPasswordInput = {
        where: { email },
        data: {
          password: newPassword,
          oldPassword
        }
      };

      const credential = await this.credentialRepository.updateCredentialPassword(
        updateCredentialPasswordInput,
        session
      );

      await this.refreshTokenRepository.revokeRefreshToken(
        {
          user: userId
        },
        session
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
