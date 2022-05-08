import { RemoteGraphQLDataSource } from '@apollo/gateway';

export class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    request.http.headers = {
      ...request.http.headers,
      ...context.headers
    };

    if (process.env.ALLOW_HOST_HEADER !== 'true') {
      delete request.http.headers.host;
    }
  }
}
