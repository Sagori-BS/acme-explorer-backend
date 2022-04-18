import { ObjectType } from '@nestjs/graphql';
import { ListEntity } from '@shared/graphql/types/base-list-entity.type';
import { Trip } from './trip.type';

@ObjectType()
export class ListTrips extends ListEntity(Trip) {}
