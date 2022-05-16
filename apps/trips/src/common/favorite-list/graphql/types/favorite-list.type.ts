import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Trip } from '@trips/common/trip/graphql/types/trip.type';
import { IFavoriteList } from '../../interfaces/entities/favorite-list.interface';

@ObjectType()
export class FavoriteList implements IFavoriteList {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => ID)
  user: string;

  @Field(() => [Trip])
  trips: Trip[];
}
