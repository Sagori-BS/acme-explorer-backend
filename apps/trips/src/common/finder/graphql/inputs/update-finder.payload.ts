import { InputType } from '@nestjs/graphql';
import { CreateFinderInput } from './create-finder.input';

@InputType()
export class UpdateFinderPayload extends CreateFinderInput {}
