import { ObjectType } from '@nestjs/graphql';
import { ListEntity } from '@shared/graphql/types/base-list-entity.type';
import { Configuration } from './configuration.type';

@ObjectType()
export class ListConfigurations extends ListEntity(Configuration) {}
