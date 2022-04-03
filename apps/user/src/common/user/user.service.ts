import { Inject, Injectable } from '@nestjs/common';
import { GetEntityByIdInput } from '@shared/data/classes/get-entity-by-id.class';
import { UserRepository } from './user.repository';
import { UpdateUserInput } from './graphql/inputs/update-user.input';
import { UserEvents } from '@shared/events/user/user.events';
import { updateUserPayload } from './utils/update-user.payload';
import { deleteUserPayload } from './utils/delete-user.payload';
import { CreateUserInput } from './graphql/inputs/create-user.input';
import { createUserPayload } from '../auth/utils/create-user.payload';
import { PubSubClient } from '@shared/microservices/pub-sub/pub-sub-client';
import { PUB_SUB_CLIENT_TOKEN } from '@shared/microservices/pub-sub/constants/pub-sub-client.constants';
import { User } from './database/user.entity';
import { Service } from '@shared/data/classes/service.class';
import { IUserServiceType } from './interfaces/types/user-service-type.interface';

@Injectable()
export class UserService extends Service<IUserServiceType> {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(PUB_SUB_CLIENT_TOKEN) private readonly client: PubSubClient,
  ) {
    super(userRepository);
  }

  public async createEntity(createUserInput: CreateUserInput): Promise<User> {
    const user = await super.createEntity(createUserInput);

    const createdUser = createUserPayload(user);

    await this.client.send({ type: UserEvents.CreatedUser }, createdUser);

    return user;
  }

  public async updateEntity(updateUserInput: UpdateUserInput): Promise<User> {
    const user = await super.updateEntity(updateUserInput);

    const updatedUser = updateUserPayload(user);

    await this.client.send({ type: UserEvents.UpdatedUser }, updatedUser);

    return user;
  }

  public async deleteEntity(
    deleteUserInput: GetEntityByIdInput,
  ): Promise<User> {
    const user = await super.deleteEntity(deleteUserInput);

    const deletedUser = deleteUserPayload(user);

    await this.client.send({ type: UserEvents.DeletedUser }, deletedUser);

    return user;
  }
}
