import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateTripInput } from './create-trip.input';
import * as joi from 'joi';
import { validateUrlsWithJoi } from '@shared/validations/common/internet/urls/urls.validator';
import { validateIsoDateWithJoi } from '@shared/validations/common/iso-date/iso-date.validator';
import { validateDescriptionWithJoi } from '@shared/validations/common/strings/description/description.validator';
import { validateTitleWithJoi } from '@shared/validations/common/strings/title/title.validator';
import { TripState } from '../../enums/trip-states.enum';

@InputType()
export class UpdateTripPayload extends PartialType(
  OmitType(CreateTripInput, ['manager'])
) {
  @Field({ nullable: true })
  reasonCancelled?: string;

  state?: TripState;

  public static validationSchema = joi.object<UpdateTripPayload>({
    startDate: validateIsoDateWithJoi,
    endDate: validateIsoDateWithJoi,
    pictures: validateUrlsWithJoi,
    title: validateTitleWithJoi,
    description: validateDescriptionWithJoi,
    reasonCancelled: validateDescriptionWithJoi
  });
}
