import { ObjectType } from '@nestjs/graphql';
import { ListEntity } from '@shared/graphql/types/base-list-entity.type';
import { Application } from './application.type';

@ObjectType()
export class ListApplications extends ListEntity(Application) {}
