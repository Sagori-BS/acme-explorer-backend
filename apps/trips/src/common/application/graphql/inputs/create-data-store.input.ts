import { InputType, Field, Float, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateDataStoreInput {
  @Field()
  carModel: string;

  @Field()
  brand: string;

  @Field({ nullable: true })
  trimLevel?: string;

  @Field(() => Int)
  year: number;

  @Field(() => Float)
  price: number;

  @Field()
  mainPicture: string;

  @Field(() => [String])
  pictures: string[];

  @Field()
  countryCode: string;

  @Field(() => GraphQLJSON, { nullable: true })
  dealer?: Record<string, any>;

  @Field(() => GraphQLJSON, { nullable: true })
  owner?: Record<string, any>;
}
