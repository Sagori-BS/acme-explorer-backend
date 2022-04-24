import { InputType, PartialType } from '@nestjs/graphql';
import * as joi from 'joi';
import { validateMongoIdWithJoi } from '@shared/validations/common/identification/mongo-id/id.validator';
import { CreateCustomSponsorshipInput } from './create-custom-sponsorship.input';
import { SponsorshipState } from '../enums/sponsorship-states.enum';
import { validateUrlWithJoi } from '@shared/validations/common/internet/url/url.validator';

@InputType()
export class UpdateCustomSponsorshipPayload extends PartialType(
  CreateCustomSponsorshipInput
) {
  public static validationSchema = joi.object<UpdateCustomSponsorshipPayload>({
    trip: validateMongoIdWithJoi('trip'),
    sponsor: validateMongoIdWithJoi('sponsor'),
    link: validateUrlWithJoi.required(),
    banner: validateUrlWithJoi.required(),
    state: joi.string().valid(...Object.values(SponsorshipState))
  });
}
