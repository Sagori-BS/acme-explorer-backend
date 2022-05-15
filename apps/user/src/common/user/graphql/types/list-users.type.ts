import { ObjectType } from '@nestjs/graphql';
import { ListEntity } from '@shared/graphql/types/base-list-entity.type';
import { User } from '@user/common/user/graphql/types/user.type';

@ObjectType()
export class ListUsers extends ListEntity(User) {}
