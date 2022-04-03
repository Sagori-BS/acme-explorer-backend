import { UserRoles } from '@common/common/auth/enums/user-roles.enum';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IUser } from '../../interfaces/entities/user-entity.interface';

@ObjectType()
export class User implements IUser {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  profilePicture: string;

  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  telephoneNumber: string;

  @Field({ nullable: true })
  address: string;

  @Field()
  email: string;

  @Field(() => [UserRoles])
  roles: UserRoles[];
}
