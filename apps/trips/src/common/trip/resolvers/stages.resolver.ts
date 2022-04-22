import { Resolver, ResolveField, Parent, ID } from '@nestjs/graphql';
import { Stage } from '../graphql/types/stage.type';

@Resolver(() => Stage)
export class StageResolver {
  @ResolveField(() => ID)
  public async id(@Parent() parent: Stage) {
    return parent._id;
  }
}
