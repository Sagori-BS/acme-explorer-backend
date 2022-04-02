import { Field, InputType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType({ isAbstract: true })
export abstract class BaseAddTranslationPayload {
  @Field(() => GraphQLJSON)
  name_translations: Record<string, any>;
}
