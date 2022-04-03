import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoggerService } from '@common/common/logger/logger.service';
import { Credential } from './database/credential.entity';
import { ClientSession, Model } from 'mongoose';
import { GetEntityByIdInput } from '@common/common/data/classes/get-entity-by-id.class';
import { InvalidFieldValueException } from '@common/common/errors/errors';
import { getEntitiesLog } from '../../../../../libs/common/src/functions/log-message-builder';
import { CreateCredentialInput } from './graphql/inputs/create-credential.input';
import { UpdateCredentialInput } from './graphql/inputs/update-credential.input';
import { updateEntities } from '@common/common/functions/update-entities';
import { GetCredentialByIdOrEmailInput } from './graphql/inputs/get-credential-by-id-or-email.input';
import { UpdateCredentialPasswordInput } from './graphql/inputs/update-credential-password.input';
import { EntityNotFoundError } from '@common/common/errors/common/entity-not-found.error';
import { PasswordMismatchError } from '../auth/errors/password-mismatch.error';

@Injectable()
export class CredentialRepository {
  constructor(
    private readonly logger: LoggerService,
    @InjectModel(Credential.name)
    private readonly credentialModel: Model<Credential>
  ) {}

  public async getCredentialByIdOrEmail(
    getCredentialByIdOrEmailInput: GetCredentialByIdOrEmailInput
  ): Promise<Credential> {
    try {
      this.logger.log(
        getEntitiesLog(Credential.name, getCredentialByIdOrEmailInput)
      );

      const result = await this.credentialModel
        .findOne(getCredentialByIdOrEmailInput)
        .exec();

      if (!result) {
        throw new EntityNotFoundError(Credential.name);
      }

      return result;
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }

  public async createCredential(
    createCredentialInput: CreateCredentialInput,
    session?: ClientSession
  ): Promise<Credential> {
    try {
      const credential = new this.credentialModel({
        ...createCredentialInput,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      if (session) return credential.save({ session });

      return credential.save();
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }

  public async updateCredential(
    updateCredentialInput: UpdateCredentialInput,
    session?: ClientSession
  ): Promise<Credential> {
    try {
      const { data, where } = updateCredentialInput;

      if (data.confirmed == false) {
        throw new InvalidFieldValueException('confirmed');
      }

      const updateCredential = updateEntities(data);

      const result = await this.credentialModel.findOneAndUpdate(
        where,
        updateCredential,
        {
          useFindAndModify: false,
          new: true,
          session
        }
      );

      if (!result) {
        throw new EntityNotFoundError(Credential.name);
      }

      return result;
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }

  public async updateCredentialPassword(
    updateCredentialInput: UpdateCredentialPasswordInput,
    session?: ClientSession
  ): Promise<Credential> {
    try {
      const { data, where } = updateCredentialInput;
      const { password, oldPassword } = data;

      const credential = await this.credentialModel.findOne(where);

      if (!credential) {
        throw new EntityNotFoundError(Credential.name);
      }

      if (
        oldPassword &&
        !(await (this.credentialModel as any).comparePassword(
          oldPassword,
          credential.password
        ))
      ) {
        throw new PasswordMismatchError();
      }

      credential.password = password;

      if (session) return await credential.save({ session });

      return await credential.save();
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }

  public async deleteCredential(
    deleteCredentialInput: GetEntityByIdInput
  ): Promise<Credential> {
    try {
      const deleteCredential = {
        deleted: true,
        updatedAt: new Date().toISOString()
      };

      const result = await this.credentialModel
        .findOneAndUpdate(deleteCredentialInput, deleteCredential, {
          useFindAndModify: false,
          new: true
        })
        .exec();

      if (!result) {
        throw new EntityNotFoundError(Credential.name);
      }

      return result;
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }
}
