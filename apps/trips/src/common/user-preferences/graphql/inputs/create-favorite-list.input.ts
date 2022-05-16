import { ValidationInput } from '@common/common/data/classes/validation-input.class';
import { validateIdsWithJoi } from '@common/common/validations/common/identification/mongo-ids/ids.validator';
import { Field, ID, InputType } from '@nestjs/graphql';
import { validateNameWithJoi } from '@shared/validations/common/strings/name/name.validator';
import * as joi from 'joi';

@InputType()
export class CreateFavoriteListInput extends ValidationInput {
  @Field()
  name: string;

  @Field(() => [ID])
  trips: string[];

  user?: string;

  public static validationSchema = joi.object<CreateFavoriteListInput>({
    name: validateNameWithJoi.required(),
    trips: validateIdsWithJoi.required()
  });
}
