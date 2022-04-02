import { AbstractTranslations } from '@common/common/language/abstracts/translations.abstract';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Translations extends AbstractTranslations {
  @Field({ nullable: true })
  en?: string;

  @Field({ nullable: true })
  es?: string;
}
