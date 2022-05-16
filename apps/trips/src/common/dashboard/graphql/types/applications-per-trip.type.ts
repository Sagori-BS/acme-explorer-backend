import { ObjectType } from '@nestjs/graphql';
import { TripManagedPerManager } from './trips-managed-per-manager.type';

@ObjectType()
export class ApplicationsPerTrip extends TripManagedPerManager {}
