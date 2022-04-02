import { AbstractTranslations } from '@common/common/language/abstracts/translations.abstract';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TranslationInput extends AbstractTranslations {
  @Field({ nullable: true })
  en?: string;

  @Field({ nullable: true })
  es?: string;
}
