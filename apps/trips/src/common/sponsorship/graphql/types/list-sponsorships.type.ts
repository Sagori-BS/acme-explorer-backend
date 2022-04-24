import { ObjectType } from '@nestjs/graphql';
import { ListEntity } from '@shared/graphql/types/base-list-entity.type';
import { Sponsorship } from './sponsorship.type';

@ObjectType()
export class ListSponsorships extends ListEntity(Sponsorship) {}
