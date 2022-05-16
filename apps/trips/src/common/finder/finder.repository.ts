import { Repository } from '@shared/data/classes/repository.class';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Finder } from './database/finder.entity';
import { IFinderRepositoryType } from './interfaces/types/common-type.interface';

@Injectable()
export class FinderRepository extends Repository<IFinderRepositoryType> {
  constructor(
    @InjectModel(Finder.name)
    private readonly finderModel: Model<Finder>
  ) {
    super(finderModel, Finder.name);
  }
}
