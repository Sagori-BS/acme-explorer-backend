import { Service } from '@shared/data/classes/service.class';
import { Injectable } from '@nestjs/common';
import { ISponsorshipServiceType } from './interfaces/types/common-type.interface';
import { Sponsorship } from './database/sponsorship.entity';
import { JwtPayload } from '@shared/auth/interfaces/jwt-payload.interface';
import { UpdateCustomSponsorshipInput } from './graphql/inputs/update-custom-sponsorship.input';
import { UserRoles } from '@shared/auth/enums/user-roles.enum';
import { FilterInput } from '@shared/graphql/inputs/graphql-filter.input';
import { ListSponsorships } from './graphql/types/list-sponsorships.type';
import { SponsorshipRepository } from './sponsorship.repository';
import { CreateSponsorshipInput } from './graphql/inputs/create-sponsorship.input';
import { CreateCustomSponsorshipInput } from './graphql/inputs/create-custom-sponsorship.input';

@Injectable()
export class SponsorshipService extends Service<ISponsorshipServiceType> {
  constructor(private readonly sponsorshipRepository: SponsorshipRepository) {
    super(sponsorshipRepository);
  }

  public async listEntities(
    filterInput: FilterInput,
    jwtPayload?: JwtPayload
  ): Promise<ListSponsorships> {
    if (jwtPayload) {
      const { id, role } = jwtPayload;
      if (role === UserRoles.SPONSOR) {
        filterInput.where = {
          ...filterInput.where,
          sponsor: id
        };
      } else {
        filterInput.where = {
          ...filterInput.where
        };
      }
    }
    return this.sponsorshipRepository.listEntities(filterInput);
  }

  public async updateSelfSponsorship(
    jwtPayload: JwtPayload,
    updateCustomSponsorshipInput: UpdateCustomSponsorshipInput
  ): Promise<Sponsorship> {
    const { id } = updateCustomSponsorshipInput.where;

    await this.sponsorshipRepository.getOneEntity({
      sponsor: jwtPayload.id,
      id
    });

    return this.sponsorshipRepository.updateEntity(
      updateCustomSponsorshipInput
    );
  }

  public async createSelfSponsorship(
    createSponsorshipInput: CreateSponsorshipInput,
    jwtPayload: JwtPayload
  ): Promise<Sponsorship> {
    const createCustomSponsorshipInput: CreateCustomSponsorshipInput = {
      ...createSponsorshipInput,
      sponsor: jwtPayload.id
    };

    return this.createEntity(createCustomSponsorshipInput);
  }
}
