import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserRoles } from '@shared/auth/enums/user-roles.enum';
import { IUser } from '../../interfaces/entities/user-entity.interface';
import { UserStatus } from '../enum/user-status.enum';

@ObjectType()
export class User implements IUser {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  profilePicture: string;

  @Field({ nullable: true })
  telephoneNumber?: string;

  @Field({ nullable: true })
  address?: string;

  @Field(() => UserRoles)
  role: UserRoles;

  @Field(() => UserStatus)
  status: UserStatus;
}
