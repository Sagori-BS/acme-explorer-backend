import { ObjectType, ID, Field, Float } from '@nestjs/graphql';
import { IConfiguration } from '../../interfaces/entities/configuration.interface';

@ObjectType()
export class Configuration implements IConfiguration {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  flatRate: number;
}
