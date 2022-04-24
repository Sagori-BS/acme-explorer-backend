import { InputType, PartialType, PickType } from '@nestjs/graphql';
import * as joi from 'joi';
import { CreateCustomSponsorshipInput } from './create-custom-sponsorship.input';
import { SponsorshipState } from '../enums/sponsorship-states.enum';

@InputType()
export class UpdateSponsorshipPayload extends PartialType(
  PickType(CreateCustomSponsorshipInput, ['state'])
) {
  public static validationSchema = joi.object<UpdateSponsorshipPayload>({
    state: joi.string().valid(...Object.values(SponsorshipState))
  });
}
