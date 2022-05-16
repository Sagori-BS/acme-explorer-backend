import { ObjectType } from '@nestjs/graphql';
import { TripManagedPerManager } from './trips-managed-per-manager.type';

@ObjectType()
export class ApplicationPerTrip extends TripManagedPerManager {}
