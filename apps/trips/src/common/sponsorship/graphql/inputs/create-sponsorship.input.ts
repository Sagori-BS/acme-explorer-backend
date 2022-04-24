import { InputType, OmitType } from '@nestjs/graphql';
import * as joi from 'joi';
import { validateMongoIdWithJoi } from '@shared/validations/common/identification/mongo-id/id.validator';
import { CreateCustomSponsorshipInput } from './create-custom-sponsorship.input';
import { validateUrlWithJoi } from '@shared/validations/common/internet/url/url.validator';

@InputType()
export class CreateSponsorshipInput extends OmitType(
  CreateCustomSponsorshipInput,
  ['sponsor', 'state']
) {
  public static validationSchema = joi.object<CreateSponsorshipInput>({
    trip: validateMongoIdWithJoi('trip').required(),
    link: validateUrlWithJoi.required(),
    banner: validateUrlWithJoi.required()
  });
}
