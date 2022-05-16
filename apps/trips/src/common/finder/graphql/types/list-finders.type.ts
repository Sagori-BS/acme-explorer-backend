import { ObjectType } from '@nestjs/graphql';
import { ListEntity } from '@shared/graphql/types/base-list-entity.type';
import { Finder } from './finder.type';

@ObjectType()
export class ListFinders extends ListEntity(Finder) {}
