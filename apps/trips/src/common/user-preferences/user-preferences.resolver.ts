import { CurrentUser } from '@common/common/auth/decorators/current-user.decorator';
import { GraphQlFieldNames } from '@common/common/graphql/enums/graphql-label-types.enum';
import { graphQlIdArgOption } from '@common/common/graphql/types/graphql-delete-mutation-options.type';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtPayload } from '@shared/auth/interfaces/jwt-payload.interface';
import { UpdateUserPreferencesPayload } from './graphql/inputs/update-user-preferences.payload';
import { UserPreferences } from './graphql/types/user-preferences.type';
import { UserPreferencesService } from './user-preferences.service';

@Resolver(() => UserPreferences)
export class UserPreferencesResolver {
  constructor(private readonly service: UserPreferencesService) {}

  @Query(() => UserPreferences)
  public async selfUserPreferences(
    @CurrentUser()
    jwtPayload: JwtPayload
  ): Promise<UserPreferences> {
    return this.service.getOneEntity({
      user: jwtPayload.id
    });
  }

  @Mutation(() => UserPreferences)
  public async updateSelfUserPreferences(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateUserPreferencesPayload: UpdateUserPreferencesPayload
  ): Promise<UserPreferences> {
    return this.service.updateSelfUserPreferences(
      jwtPayload,
      updateUserPreferencesPayload
    );
  }

  @Mutation(() => UserPreferences)
  public async addFavoriteTrip(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string
  ): Promise<UserPreferences> {
    return this.service.addFavoriteTrip(jwtPayload, id);
  }

  @Mutation(() => UserPreferences)
  public async removeFavoriteTrip(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string
  ): Promise<UserPreferences> {
    return this.service.removeFavoriteTrip(jwtPayload, id);
  }

  @Mutation(() => UserPreferences)
  public async clearAllFavoriteTrips(
    @CurrentUser()
    jwtPayload: JwtPayload
  ): Promise<UserPreferences> {
    return this.service.clearAllFavoriteTrips(jwtPayload);
  }
}
