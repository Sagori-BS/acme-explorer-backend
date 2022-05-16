import { ObjectType, ID, Field, Float } from '@nestjs/graphql';
import { IFinder } from '../../interfaces/entities/finder.interface';

@ObjectType()
export class Finder implements IFinder {
  @Field(() => ID)
  id: string;

  @Field()
  explorer: string;

  @Field({ nullable: true })
  keyword: string;

  @Field(() => Float, { nullable: true })
  minPrice: number;

  @Field(() => Float, { nullable: true })
  maxPrice: number;

  @Field({ nullable: true })
  minDate: string;

  @Field({ nullable: true })
  maxDate: string;
}
