import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Trip } from '@trips/common/trip/graphql/types/trip.type';
import { IUserPreferences } from '../../interfaces/entities/user-preferences.interface';

@ObjectType()
export class UserPreferences implements IUserPreferences {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  user: string;

  @Field(() => [Trip])
  trips: Trip[];
}
