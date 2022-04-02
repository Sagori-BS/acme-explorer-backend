import { ArgsOptions, ID } from '@nestjs/graphql';

export const graphQlIdsArgOption: ArgsOptions = {
  type: () => [ID]
};
