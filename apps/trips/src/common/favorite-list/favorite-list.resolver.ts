import { CurrentUser } from '@common/common/auth/decorators/current-user.decorator';
import { GraphQlFieldNames } from '@common/common/graphql/enums/graphql-label-types.enum';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtPayload } from '@shared/auth/interfaces/jwt-payload.interface';
import { AddFavoriteTripInput } from './graphql/inputs/add-favorite-trip.input';
import { RemoveFavoriteTripInput } from './graphql/inputs/remove-favorite-trip.input';
import { FavoriteList } from './graphql/types/favorite-list.type';
import { FavoriteListService } from './favorite-list.service';
import { graphQlIdArgOption } from '@shared/graphql/types/graphql-delete-mutation-options.type';
import { UpdateFavoriteListInput } from './graphql/inputs/update-favorite-list.input';
import { CreateFavoriteListInput } from './graphql/inputs/create-favorite-list.input';
import { FilterInput } from '@shared/graphql/inputs/graphql-filter.input';
import { graphQlFindQueryOptions } from '@shared/graphql/types/graphql-filter-options';

@Resolver(() => FavoriteList)
export class FavoriteListResolver {
  constructor(private readonly service: FavoriteListService) {}

  @Query(() => [FavoriteList])
  public async selfFavoritesList(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<FavoriteList[]> {
    return this.service.getEntities({
      ...filterInput,
      where: {
        user: jwtPayload.id,
        ...filterInput.where
      }
    });
  }

  @Mutation(() => FavoriteList)
  public async addFavoriteTrip(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    addFavoriteTripInput: AddFavoriteTripInput
  ): Promise<FavoriteList> {
    return this.service.addFavoriteTrip(jwtPayload, addFavoriteTripInput);
  }

  @Mutation(() => FavoriteList)
  public async removeFavoriteTrip(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    removeFavoriteTripInput: RemoveFavoriteTripInput
  ): Promise<FavoriteList> {
    return this.service.removeFavoriteTrip(jwtPayload, removeFavoriteTripInput);
  }

  @Mutation(() => FavoriteList)
  public async deleteFavoriteList(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string
  ): Promise<FavoriteList> {
    return this.service.deleteFavoriteList(jwtPayload, id);
  }

  @Mutation(() => FavoriteList)
  public async renameFavoriteList(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateFavoriteListInput: UpdateFavoriteListInput
  ): Promise<FavoriteList> {
    return this.service.renameFavoriteList(jwtPayload, updateFavoriteListInput);
  }

  @Mutation(() => FavoriteList)
  public async createFavoriteList(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createFavoriteListInput: CreateFavoriteListInput
  ): Promise<FavoriteList> {
    return this.service.createFavoriteList(jwtPayload, createFavoriteListInput);
  }
}
