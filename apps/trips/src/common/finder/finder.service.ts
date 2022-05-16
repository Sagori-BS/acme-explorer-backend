import { Service } from '@shared/data/classes/service.class';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '@shared/auth/interfaces/jwt-payload.interface';
import { IFinderServiceType } from './interfaces/types/common-type.interface';
import { UpdateFinderInput } from './graphql/inputs/update-finder.input';
import { Finder } from './database/finder.entity';
import { FinderRepository } from './finder.repository';
import { FilterInput } from '@shared/graphql/inputs/graphql-filter.input';
import { ListFinders } from './graphql/types/list-finders.type';
import { CreateFinderInput } from './graphql/inputs/create-finder.input';

@Injectable()
export class FinderService extends Service<IFinderServiceType> {
  constructor(private readonly finderRepository: FinderRepository) {
    super(finderRepository);
  }

  public async createSelfFinder(
    createEntityInput: CreateFinderInput,
    jwtPayload: JwtPayload
  ): Promise<Finder> {
    createEntityInput.explorer = jwtPayload.id;
    return this.finderRepository.createEntity(createEntityInput);
  }

  public async listEntities(
    filterInput: FilterInput,
    jwtPayload?: JwtPayload
  ): Promise<ListFinders> {
    if (jwtPayload) {
      const { id } = jwtPayload;
      filterInput.where = {
        ...filterInput.where,
        explorer: id
      };
    }

    return this.finderRepository.listEntities(filterInput);
  }

  public async updateSelfFinder(
    updateFinderInput: UpdateFinderInput,
    jwtPayload: JwtPayload
  ): Promise<Finder> {
    const { id } = updateFinderInput.where;

    await this.finderRepository.getOneEntity({
      explorer: jwtPayload.id,
      id
    });

    return this.finderRepository.updateEntity(updateFinderInput);
  }
}
