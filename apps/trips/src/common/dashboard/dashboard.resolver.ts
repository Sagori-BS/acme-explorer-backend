import { Resolver, Query } from '@nestjs/graphql';
import { Dashboard } from './graphql/types/dashboard.type';
import { AuthorizedRoles } from '@shared/auth/decorators/authorized-roles.decorator';
import { UserRoles } from '@shared/auth/enums/user-roles.enum';
import { DashboardService } from './dashboard.service';

@Resolver(() => Dashboard)
export class DashboardResolver {
  constructor(private readonly service: DashboardService) {}

  @AuthorizedRoles(UserRoles.ADMIN)
  @Query(() => Dashboard)
  public async getAnalitycs() {
    return this.service.getAnalitycs();
  }
}
