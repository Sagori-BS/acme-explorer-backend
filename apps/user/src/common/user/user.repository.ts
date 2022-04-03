import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { createEntityLog } from '@shared/functions/log-message-builder';
import { User } from './database/user.entity';
import { CreateUserInput } from './graphql/inputs/create-user.input';
import { CredentialService } from '../credential/credential.service';
import { Repository } from '@shared/data/classes/repository.class';
import { IUserRepositoryType } from './interfaces/types/user-repository-type.interface';

@Injectable()
export class UserRepository extends Repository<IUserRepositoryType> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectConnection()
    private readonly connection: Connection,
    private readonly credentialService: CredentialService,
  ) {
    super(userModel, User.name);
  }

  public async createEntity(createUserInput: CreateUserInput): Promise<User> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const { email, password } = createUserInput;

      this._logger.log(createEntityLog(User.name, createUserInput));

      await this.credentialService.createCredential(
        { email, password },
        session,
      );

      delete createUserInput.password;

      const user = new this.userModel({
        ...createUserInput,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      await user.save({ session });
      await session.commitTransaction();

      const entity = await this.getOneEntity({ id: user.id });

      return entity;
    } catch (error) {
      this._logger.error(`${JSON.stringify(error)}`);
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
