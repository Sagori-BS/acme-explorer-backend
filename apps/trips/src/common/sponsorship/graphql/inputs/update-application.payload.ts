import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateApplicationInput } from './create-application.input';
import * as joi from 'joi';

@InputType()
export class UpdateApplicationPayload extends PartialType(
  OmitType(CreateApplicationInput, ['trip'])
) {
  public static validationSchema = joi.object<CreateApplicationInput>({
    comments: joi.array().items(joi.string())
  });
}
