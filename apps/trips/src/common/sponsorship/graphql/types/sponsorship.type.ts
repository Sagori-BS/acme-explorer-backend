import { ObjectType, ID, Field } from '@nestjs/graphql';
import { Trip } from '@trips/common/trip/graphql/types/trip.type';
import { TripsUser } from '@trips/common/user/graphql/user.type';
import { ISponsorship } from '../../interfaces/entities/sponsorship.interface';
import { SponsorshipState } from '../enums/sponsorship-states.enum';

@ObjectType()
export class Sponsorship implements ISponsorship {
  @Field(() => ID)
  id: string;

  @Field(() => TripsUser)
  sponsor: TripsUser;

  @Field(() => Trip)
  trip: Trip;

  @Field(() => SponsorshipState)
  state: SponsorshipState;

  @Field()
  banner: string;

  @Field()
  link: string;
}
