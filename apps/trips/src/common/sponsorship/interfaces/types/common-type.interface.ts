import { BaseRepositoryType } from '@shared/data/interfaces/base-repository-type.interface';
import { BaseServiceType } from '@shared/data/interfaces/base-service-type.interface';
import { Model } from 'mongoose';
import { Sponsorship } from '../../database/sponsorship.entity';
import { CreateCustomSponsorshipInput } from '../../graphql/inputs/create-custom-sponsorship.input';
import { UpdateCustomSponsorshipInput } from '../../graphql/inputs/update-custom-sponsorship.input';
import { SponsorshipRepository } from '../../sponsorship.repository';

export interface ISponsorshipRepositoryType extends BaseRepositoryType {
  entity: Sponsorship;
  entityModel: Model<Sponsorship>;
  createEntityInput: CreateCustomSponsorshipInput;
  updateEntityInput: UpdateCustomSponsorshipInput;
}

export interface ISponsorshipServiceType extends BaseServiceType {
  entity: Sponsorship;
  entityRepository: SponsorshipRepository;
  createEntityInput: CreateCustomSponsorshipInput;
  updateEntityInput: UpdateCustomSponsorshipInput;
}
