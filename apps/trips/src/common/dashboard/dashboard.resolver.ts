import { Resolver, Query, ResolveField } from '@nestjs/graphql';
import { Dashboard } from './graphql/types/dashboard.type';
import { AuthorizedRoles } from '@shared/auth/decorators/authorized-roles.decorator';
import { UserRoles } from '@shared/auth/enums/user-roles.enum';
import { DashboardService } from './dashboard.service';
import { ApplicationPerTrip } from './graphql/types/application-per-trip.type';
import { PricePerTrip } from './graphql/types/price-per-trip.type';

@Resolver(() => Dashboard)
export class DashboardResolver {
  constructor(private readonly service: DashboardService) {}

  @AuthorizedRoles(UserRoles.ADMIN)
  @Query(() => Dashboard)
  public async getAnalitycs() {
    return this.service.getAnalitycs();
  }

  // Field resolvers
  @ResolveField(() => ApplicationPerTrip)
  public async applicationPerTrip() {
    return this.service.applicationPerTrip();
  }

  @ResolveField(() => PricePerTrip)
  public async pricePerTrip() {
    return this.service.pricePerTrip();
  }
}
