import { InputType } from '@nestjs/graphql';
import { CreateConfigurationInput } from './create-configuration.input';

@InputType()
export class UpdateConfigurationPayload extends CreateConfigurationInput {}
