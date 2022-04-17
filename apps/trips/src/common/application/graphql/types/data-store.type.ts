import { ObjectType, ID, Field, Float, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { IDataStore } from '../../interfaces/entities/application.interface';

@ObjectType()
export class DataStore implements IDataStore {
  @Field(_type => ID)
  id: string;

  @Field()
  carModel: string;

  @Field()
  brand: string;

  @Field({ nullable: true })
  trimLevel: string;

  @Field(_type => Int)
  year: number;

  @Field(_type => Float)
  price: number;

  @Field()
  mainPicture: string;

  @Field(_type => [String])
  pictures: string[];

  @Field()
  countryCode: string;

  @Field(_type => GraphQLJSON, { nullable: true })
  dealer: Record<string, any>;

  @Field(_type => GraphQLJSON, { nullable: true })
  owner: Record<string, any>;
}
