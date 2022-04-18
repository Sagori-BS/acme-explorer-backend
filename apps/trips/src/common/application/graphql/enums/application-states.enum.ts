import { registerEnumType } from '@nestjs/graphql';

export enum ApplicationState {
  PENDING = 'pending',
  REJECTED = 'rejected',
  DUE = 'due',
  ACCEPTED = 'accepted',
  CANCELLED = 'cancelled'
}

registerEnumType(ApplicationState, {
  name: 'ApplicationState'
});
