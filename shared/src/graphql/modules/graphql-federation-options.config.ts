import { gqlErrorFormatter } from '@shared/errors/utils/gql-error-formatter.util';
import { GqlModuleOptions } from '@nestjs/graphql';
import { IExpressContext } from './interfaces/express-context.interface';

export const graphQLFederationOptions: GqlModuleOptions = {
  autoSchemaFile: true,
  context: (expressContext: IExpressContext) => {
    const { req } = expressContext;
    return { headers: req.headers };
  },
  formatError: gqlErrorFormatter
};
