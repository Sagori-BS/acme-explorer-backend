import { ObjectType, ID, Field, Float } from '@nestjs/graphql';
import { IStage } from '../../interfaces/entities/stage';

@ObjectType()
export class Stage implements IStage {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;
}
