import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';

export interface IGraphqlRequest {
  req: Request;
  headers: IncomingHttpHeaders;
}
