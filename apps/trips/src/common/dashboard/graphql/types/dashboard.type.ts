import { Field, ObjectType } from '@nestjs/graphql';
import { TripManagedPerManager } from './trips-managed-per-manager.type';

@ObjectType()
export class Dashboard {
  @Field(() => TripManagedPerManager)
  tripManagedPerManager: TripManagedPerManager;
}
