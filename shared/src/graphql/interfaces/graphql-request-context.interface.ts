import { IncomingHttpHeaders } from 'http';
import DataLoader from 'dataloader';

export interface IGraphQLRequestContext<
  Loaders = Record<string, typeof DataLoader>
> {
  headers: IncomingHttpHeaders;
  loaders: Loaders;
}
