import { registerEnumType } from '@nestjs/graphql';

export enum TripState {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  CANCELLED = 'CANCELLED'
}

registerEnumType(TripState, {
  name: 'TripState'
});
