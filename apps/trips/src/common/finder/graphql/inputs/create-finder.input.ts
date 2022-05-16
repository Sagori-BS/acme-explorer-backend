import { InputType, Field, Float } from '@nestjs/graphql';
import { ValidationInput } from '@shared/data/classes/validation-input.class';
import * as joi from 'joi';

@InputType()
export class CreateFinderInput extends ValidationInput {
  @Field({ nullable: true })
  keyword?: string;

  @Field(() => Float, { nullable: true })
  minPrice?: number;

  @Field(() => Float, { nullable: true })
  maxPrice?: number;

  @Field({ nullable: true })
  minDate?: string;

  @Field({ nullable: true })
  maxDate?: string;

  explorer?: string;

  public static validationSchema = joi
    .object<CreateFinderInput>({
      keyword: joi.string(),
      minPrice: joi.number(),
      maxPrice: joi.number(),
      minDate: joi.string(),
      maxDate: joi.string()
    })
    .min(1);
}
