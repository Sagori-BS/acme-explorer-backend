import { IGetEntityBySlugDto } from '../interfaces/get-entity-by-slug.interface';

export class GetEntityBySlugDto implements IGetEntityBySlugDto {
  deleted?: boolean;
  slug: string;
}
