import FileUploadDataSource from '@profusion/apollo-federation-upload';

export class AuthenticatedDataSource extends FileUploadDataSource {
  async willSendRequest({ request, context }) {
    request.http.headers = {
      ...request.http.headers,
      ...context.headers,
    };

    if (process.env.ALLOW_HOST_HEADER !== 'true') {
      delete request.http.headers.host;
    }
  }
}
