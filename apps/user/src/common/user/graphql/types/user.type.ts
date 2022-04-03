import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IUser } from '../../interfaces/entities/user-entity.interface';

@ObjectType()
export class User implements IUser {
  @Field(_type => ID)
  id: string;

  @Field({ nullable: true })
  profilePicture: string;

  @Field()
  name: string;

  @Field()
  email: string;
}
