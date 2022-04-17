import { Field, Float, InputType, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class UpdateDataStorePayload {
  @Field({ nullable: true })
  carModel?: string;

  @Field({ nullable: true })
  brand?: string;

  @Field({ nullable: true })
  trimLevel?: string;

  @Field(() => Int, { nullable: true })
  year?: number;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field({ nullable: true })
  mainPicture?: string;

  @Field(() => [String], { nullable: true })
  pictures?: string[];

  @Field({ nullable: true })
  countryCode?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  dealer?: Record<string, any>;

  @Field(() => GraphQLJSON, { nullable: true })
  owner?: Record<string, any>;
}
