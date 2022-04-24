import { InputType, Field, ID } from '@nestjs/graphql';
import { SponsorshipState } from '../enums/sponsorship-states.enum';
import * as joi from 'joi';
import { validateMongoIdWithJoi } from '@shared/validations/common/identification/mongo-id/id.validator';
import { validateUrlWithJoi } from '@shared/validations/common/internet/url/url.validator';
import { ValidationInput } from '@shared/data/classes/validation-input.class';

@InputType()
export class CreateCustomSponsorshipInput extends ValidationInput {
  @Field(() => ID)
  trip: string;

  @Field(() => ID)
  sponsor: string;

  @Field()
  banner: string;

  @Field()
  link: string;

  @Field(() => SponsorshipState, { nullable: true })
  state?: SponsorshipState;

  public static validationSchema = joi.object<CreateCustomSponsorshipInput>({
    trip: validateMongoIdWithJoi('trip').required(),
    sponsor: validateMongoIdWithJoi('sponsor').required(),
    link: validateUrlWithJoi.required(),
    banner: validateUrlWithJoi.required(),
    state: joi.string().valid(...Object.values(SponsorshipState))
  });
}
