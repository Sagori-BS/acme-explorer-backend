import { Repository } from '@shared/data/classes/repository.class';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sponsorship } from './database/sponsorship.entity';
import { ISponsorshipRepositoryType } from './interfaces/types/common-type.interface';

@Injectable()
export class SponsorshipRepository extends Repository<
  ISponsorshipRepositoryType
> {
  constructor(
    @InjectModel(Sponsorship.name)
    private readonly sponsorshipModel: Model<Sponsorship>
  ) {
    super(sponsorshipModel, Sponsorship.name);
  }
}
