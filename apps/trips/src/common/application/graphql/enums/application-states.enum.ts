import { registerEnumType } from '@nestjs/graphql';

export enum ApplicationState {
  PENDING = 'pending',
  REJECTED = 'rejected',
  DUE = 'due',
  PAID = 'paid',
  CANCELLED = 'cancelled'
}

registerEnumType(ApplicationState, {
  name: 'ApplicationState'
});
