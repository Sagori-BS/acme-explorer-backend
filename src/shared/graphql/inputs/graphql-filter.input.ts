import { IBaseGraphqlFilterInput } from '@common/common/data/interfaces/base-graphql-filter-input.interface';
import { Field, InputType, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { GraphqlSortOperation } from '../advanced-filter/enum/graphql-sort-operation.enum';

@InputType()
export class FilterInput implements IBaseGraphqlFilterInput {
  @Field(() => Int, { nullable: true })
  start?: number;

  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field(() => GraphQLJSON, { nullable: true })
  sort?: Record<string, GraphqlSortOperation>;

  @Field(() => GraphQLJSON, { nullable: true })
  where?: Record<string, any>;
}
