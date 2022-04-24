import { registerEnumType } from '@nestjs/graphql';

export enum SponsorshipState {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

registerEnumType(SponsorshipState, {
  name: 'SponsorshipState'
});
