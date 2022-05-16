import { ValidationInput } from '@common/common/data/classes/validation-input.class';
import { Field, InputType } from '@nestjs/graphql';
import { validateNameWithJoi } from '@shared/validations/common/strings/name/name.validator';
import * as joi from 'joi';

@InputType()
export class UpdateFavoriteListPayload extends ValidationInput {
  @Field()
  name: string;

  public static validationSchema = joi.object<UpdateFavoriteListPayload>({
    name: validateNameWithJoi.required()
  });
}
