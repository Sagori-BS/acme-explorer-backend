import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IUser } from '../interfaces/entities/user-entity.interface';

@ObjectType()
export class TripsUser implements IUser {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  profilePicture: string;

  @Field()
  email: string;

  version: number;
}
