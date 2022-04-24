import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Sponsorship } from './graphql/types/Sponsorship.type';
import { FilterInput } from '@shared/graphql/inputs/graphql-filter.input';
import { graphQlIdArgOption } from '@shared/graphql/types/graphql-delete-mutation-options.type';
import { graphQlFindQueryOptions } from '@shared/graphql/types/graphql-filter-options';
import { AuthorizedRoles } from '@shared/auth/decorators/authorized-roles.decorator';
import { UserRoles } from '@shared/auth/enums/user-roles.enum';
import { GraphQlFieldNames } from '@shared/graphql/enums/graphql-label-types.enum';
import { SponsorshipService } from './Sponsorship.service';
import {
  EXPLORER,
  MANAGER,
  SPONSOR
} from '@shared/auth/arrays/authorized-roles.arrays';
import { CreateSponsorshipInput } from './graphql/inputs/create-sponsorship.input';
import { UpdateSponsorshipInput } from './graphql/inputs/update-sponsorship.input';
import { ListSponsorships } from './graphql/types/list-sponsorships.type';
import { CurrentUser } from '@shared/auth/decorators/current-user.decorator';
import { JwtPayload } from '@shared/auth/interfaces/jwt-payload.interface';
import { CreateCustomSponsorshipInput } from './graphql/inputs/create-custom-sponsorship.input';
import { UpdateCustomSponsorshipInput } from './graphql/inputs/update-custom-sponsorship.input';
import { SponsorshipState } from './graphql/enums/sponsorship-states.enum';

@Resolver(() => Sponsorship)
export class SponsorshipResolver {
  constructor(private readonly service: SponsorshipService) {}

  @AuthorizedRoles(...MANAGER)
  @Query(() => Sponsorship)
  public async getSponsorshipById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption)
    id: string
  ): Promise<Sponsorship> {
    return this.service.getOneEntity({ id });
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Query(() => [Sponsorship])
  public async getAllSponsorships(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<Sponsorship[]> {
    return this.service.getAllEntities(filterInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Query(() => [Sponsorship])
  public async getSponsorships(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<Sponsorship[]> {
    return this.service.getEntities(filterInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Query(() => ListSponsorships)
  public async listSponsorships(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<ListSponsorships> {
    return this.service.listEntities(filterInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => Sponsorship)
  public async createSponsorship(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createCustomSponsorshipInput: CreateCustomSponsorshipInput
  ): Promise<Sponsorship> {
    return this.service.createEntity(createCustomSponsorshipInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => Sponsorship)
  public async updateSponsorship(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateCustomSponsorshipInput: UpdateCustomSponsorshipInput
  ): Promise<Sponsorship> {
    return this.service.updateEntity(updateCustomSponsorshipInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => Sponsorship)
  public async deleteSponsorship(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string
  ): Promise<Sponsorship> {
    return this.service.deleteEntity({ id });
  }

  // Business logic
  @AuthorizedRoles(...SPONSOR)
  @Query(() => ListSponsorships)
  public async getSelfSponsorships(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<ListSponsorships> {
    return this.service.listEntities(filterInput, jwtPayload);
  }

  @AuthorizedRoles(...EXPLORER)
  @Mutation(() => Sponsorship)
  public async createSelfSponsorship(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createSponsorshipInput: CreateSponsorshipInput
  ): Promise<Sponsorship> {
    return this.service.createEntity(createSponsorshipInput);
  }

  @AuthorizedRoles(...SPONSOR)
  @Mutation(() => Sponsorship)
  public async cancelSelfSponsorship(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string
  ): Promise<Sponsorship> {
    return this.service.updateSelfSponsorship(jwtPayload, {
      where: { id },
      data: { state: SponsorshipState.INACTIVE }
    });
  }

  @AuthorizedRoles(...EXPLORER)
  @Mutation(() => Sponsorship)
  public async paySelfSponsorship(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string
  ): Promise<Sponsorship> {
    return this.service.updateSelfSponsorship(jwtPayload, {
      where: { id },
      data: { state: SponsorshipState.ACCEPTED }
    });
  }

  @AuthorizedRoles(...MANAGER)
  @Mutation(() => Sponsorship)
  public async acceptSponsorship(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string
  ): Promise<Sponsorship> {
    return this.service.updateSelfSponsorship(jwtPayload, {
      where: { id },
      data: { state: SponsorshipState.ACCEPTED }
    });
  }

  @AuthorizedRoles(...MANAGER)
  @Mutation(() => Sponsorship)
  public async rejectSponsorship(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string
  ): Promise<Sponsorship> {
    return this.service.updateSelfSponsorship(jwtPayload, {
      where: { id },
      data: { state: SponsorshipState.REJECTED }
    });
  }
}
