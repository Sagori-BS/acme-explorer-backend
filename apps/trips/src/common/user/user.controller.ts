import { UserEvents } from '@common/common/events/user/user.events';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import {
  CreatedUserPayload,
  DeletedUserPayload,
  UpdatedUserPayload
} from '@common/common/events/user/user.payload';
import { User } from './database/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @EventPattern({ type: UserEvents.CreatedUser })
  public async createUser(
    createdUserPayload: CreatedUserPayload
  ): Promise<User> {
    return this.service.createEntity(createdUserPayload);
  }

  @EventPattern({ type: UserEvents.UpdatedUser })
  public async updateUser(
    updateUserPayload: UpdatedUserPayload
  ): Promise<User> {
    return this.service.updateEntity(updateUserPayload);
  }

  @EventPattern({ type: UserEvents.DeletedUser })
  public async deleteUser(
    deleteUserPayload: DeletedUserPayload
  ): Promise<User> {
    return this.service.deleteEntity(deleteUserPayload);
  }
}
